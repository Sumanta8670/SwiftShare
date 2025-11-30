import { useContext, useState, useEffect } from "react";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { apiEndPoints } from "../utils/apiEndPoints.js";
import UploadBox from "../components/UploadBox.jsx";
import toast from "react-hot-toast";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success", "error", or "info"
  const [credits, setCredits] = useState(0);
  const { getToken } = useAuth();
  const MAX_FILES = 5;

  // Fetch user credits on component mount
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
      setMessage(`You can upload a maximum of ${MAX_FILES} files at a time.`);
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
    setMessageType("");
    setMessage("");
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessageType("error");
      setMessage("Please select at least one file to upload");
      toast.error("Please select at least one file");
      return;
    }

    if (files.length > MAX_FILES) {
      setMessage(`You can upload a maximum of ${MAX_FILES} files at once`);
      setMessageType("error");
      toast.error(`Maximum ${MAX_FILES} files allowed`);
      return;
    }

    if (files.length > credits) {
      setMessage(
        `You need ${files.length} credits but only have ${credits} credits`
      );
      setMessageType("error");
      toast.error("Insufficient credits");
      return;
    }

    setUploading(true);
    setMessageType("info");
    setMessage("Uploading files...");

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

      if (response.data && response.data.remainingCredits !== undefined) {
        setCredits(response.data.remainingCredits);
      }

      setMessageType("success");
      setMessage(
        `${files.length} file${
          files.length > 1 ? "s" : ""
        } uploaded successfully!`
      );
      toast.success("Files uploaded successfully!");
      setFiles([]);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } catch (error) {
      console.error("Upload error:", error);
      setMessageType("error");
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Error uploading files. Please try again.";
      setMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  const isUploadDisabled =
    files.length === 0 ||
    uploading ||
    files.length > MAX_FILES ||
    credits <= 0 ||
    files.length > credits;

  return (
    <DashboardLayout activeMenu="Upload">
      <div className="p-6">
        {/* Alert Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              messageType === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : messageType === "error"
                ? "bg-red-50 text-red-800 border border-red-200"
                : "bg-blue-50 text-blue-700 border border-blue-200"
            }`}
          >
            {messageType === "error" && <AlertCircle className="w-5 h-5" />}
            {messageType === "success" && <CheckCircle className="w-5 h-5" />}
            {messageType === "info" && <Info className="w-5 h-5" />}
            <span>{message}</span>
          </div>
        )}

        {/* Upload Box */}
        <UploadBox
          files={files}
          onFileChange={handleFileChange}
          onRemoveFile={handleRemoveFile}
          onUpload={handleUpload}
          uploading={uploading}
          remainingCredits={credits}
          isUploadDisabled={isUploadDisabled}
        />
      </div>
    </DashboardLayout>
  );
};

export default Upload;
