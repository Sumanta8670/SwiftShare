import { useContext, useState, useEffect } from "react";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import { AlertCircle, CheckCircle, Info, Zap } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { apiEndPoints } from "../utils/apiEndPoints.js";
import UploadBox from "../components/UploadBox.jsx";
import toast from "react-hot-toast";
import { UserCreditsContext } from "../context/UserCreditsContext.jsx";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [credits, setCredits] = useState(0);
  const { getToken } = useAuth();
  const { fetchUserCredits } = useContext(UserCreditsContext);
  const MAX_FILES = 5;

  useEffect(() => {
    fetchCredits();
  }, []);

  const fetchCredits = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(apiEndPoints.GET_CREDITS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCredits(response.data.credits);
    } catch (error) {
      console.error("Error fetching credits:", error);
      toast.error("Failed to fetch credits");
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + files.length > MAX_FILES) {
      setMessage(`Maximum ${MAX_FILES} files per upload`);
      setMessageType("error");
      toast.error(`Maximum ${MAX_FILES} files allowed`);
      return;
    }
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setMessage("");
    setMessageType("");
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessageType("error");
      setMessage("Please select at least one file");
      return;
    }

    if (files.length > credits) {
      setMessage(`Need ${files.length} credits, have ${credits}`);
      setMessageType("error");
      return;
    }

    setUploading(true);
    setMessage("Uploading files...");
    setMessageType("info");

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const token = await getToken();
      const response = await axios.post(apiEndPoints.UPLOAD_FILES, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.remainingCredits !== undefined) {
        setCredits(response.data.remainingCredits);
      }

      setMessageType("success");
      setMessage(
        `${files.length} file${files.length > 1 ? "s" : ""} uploaded!`
      );
      toast.success("Files uploaded successfully!");
      setFiles([]);

      await fetchUserCredits();

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessageType("error");
      const errorMsg = error.response?.data?.error || "Upload failed";
      setMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  const isDisabled = files.length === 0 || uploading || files.length > credits;

  return (
    <DashboardLayout activeMenu="Upload">
      <div className="p-6 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Upload Files</h1>
          <p className="text-gray-300">Upload, manage and share securely</p>
        </div>

        {/* Alert Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 border ${
              messageType === "success"
                ? "bg-green-500/10 text-green-300 border-green-500/30"
                : messageType === "error"
                ? "bg-red-500/10 text-red-300 border-red-500/30"
                : "bg-blue-500/10 text-blue-300 border-blue-500/30"
            }`}
          >
            {messageType === "error" && <AlertCircle className="w-5 h-5" />}
            {messageType === "success" && <CheckCircle className="w-5 h-5" />}
            {messageType === "info" && <Info className="w-5 h-5" />}
            {message}
          </div>
        )}

        {/* Credits Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-linear-to-br from-orange-500/10 to-transparent border border-orange-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="text-orange-400" size={24} />
              <span className="text-gray-400">Credits Available</span>
            </div>
            <p className="text-3xl font-bold text-white">{credits}</p>
            <p className="text-xs text-gray-400 mt-2">1 credit = 1 file</p>
          </div>

          <div className="bg-linear-to-br from-blue-500/10 to-transparent border border-blue-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📁</span>
              <span className="text-gray-400">Files Selected</span>
            </div>
            <p className="text-3xl font-bold text-white">{files.length}</p>
            <p className="text-xs text-gray-400 mt-2">
              Max {MAX_FILES} per batch
            </p>
          </div>

          <div className="bg-linear-to-br from-emerald-500/10 to-transparent border border-emerald-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">✓</span>
              <span className="text-gray-400">Encryption</span>
            </div>
            <p className="text-3xl font-bold text-white">256-bit</p>
            <p className="text-xs text-gray-400 mt-2">AES Encrypted</p>
          </div>
        </div>

        {/* Upload Box */}
        <UploadBox
          files={files}
          onFileChange={handleFileChange}
          onRemoveFile={handleRemoveFile}
          onUpload={handleUpload}
          uploading={uploading}
          remainingCredits={credits}
          isUploadDisabled={isDisabled}
        />

        {/* Features */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-orange-500/30 transition-all">
            <h3 className="text-lg font-bold text-white mb-3">
              🚀 Why Choose Us
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>✓ Lightning-fast uploads</li>
              <li>✓ Military-grade encryption</li>
              <li>✓ Instant file sharing</li>
              <li>✓ No file size limits*</li>
            </ul>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-orange-500/30 transition-all">
            <h3 className="text-lg font-bold text-white mb-3">💡 Pro Tips</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>✓ Drag & drop multiple files</li>
              <li>✓ Pause & resume uploads</li>
              <li>✓ Share with custom settings</li>
              <li>✓ Track file downloads</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Upload;
