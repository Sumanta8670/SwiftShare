import { useAuth } from "@clerk/clerk-react";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import { useContext, useEffect, useState } from "react";
import { UserCreditsContext } from "../context/UserCreditsContext.jsx";
import axios from "axios";
import { apiEndPoints } from "../utils/apiEndPoints.js";
import { Loader2, Upload, FileIcon } from "lucide-react";
import DashboardUpload from "../components/DashBoardUpload.jsx";
import RecentFiles from "../components/RecentFiles.jsx";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const { getToken } = useAuth();
  const { fetchUserCredits, credits } = useContext(UserCreditsContext);
  const MAX_FILES = 10;

  useEffect(() => {
    const fetchRecentFiles = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        const response = await axios.get(apiEndPoints.FETCH_FILES, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const sortedFiles = response.data
          .sort((a, b) => new Date(b.uploadAt) - new Date(a.uploadAt))
          .slice(0, 10);
        setFiles(sortedFiles);
      } catch (error) {
        console.error("Error fetching recent files:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentFiles();
  }, [getToken]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + uploadFiles.length > MAX_FILES) {
      setMessage(`You can upload a maximum of ${MAX_FILES} files at a time.`);
      setMessageType("error");
      return;
    }
    setUploadFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setMessage("");
    setMessageType("");
  };

  const handleRemoveFile = (index) => {
    setUploadFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setMessageType("");
    setMessage("");
  };

  const handleUpload = async () => {
    if (uploadFiles.length === 0) {
      setMessageType("error");
      setMessage("Please select at least one file to upload");
      return;
    }

    if (uploadFiles.length > credits) {
      setMessage(
        `You need ${uploadFiles.length} credits but only have ${credits} credits`
      );
      setMessageType("error");
      return;
    }

    setUploading(true);
    setMessage("Uploading files...");
    setMessageType("info");

    const formData = new FormData();
    uploadFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const token = await getToken();
      const response = await axios.post(apiEndPoints.UPLOAD_FILES, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Files uploaded successfully!");
      setMessageType("success");
      setUploadFiles([]);

      const res = await axios.get(apiEndPoints.FETCH_FILES, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const sortedFiles = res.data
        .sort((a, b) => new Date(b.uploadAt) - new Date(a.uploadAt))
        .slice(0, 10);
      setFiles(sortedFiles);

      await fetchUserCredits();

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } catch (error) {
      console.error("Error uploading files:", error);
      setMessage(error.response?.data?.error || "Failed to upload files");
      setMessageType("error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Drive</h1>
          <p className="text-gray-600 mt-2">
            Upload, manage and share your files securely
          </p>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              messageType === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : messageType === "error"
                ? "bg-red-50 text-red-800 border border-red-200"
                : "bg-blue-50 text-blue-800 border border-blue-200"
            }`}
          >
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section - Left Column */}
          <div className="lg:col-span-1">
            <DashboardUpload
              files={uploadFiles}
              onFileChange={handleFileChange}
              onRemoveFile={handleRemoveFile}
              onUpload={handleUpload}
              uploading={uploading}
              maxFiles={MAX_FILES}
            />
          </div>

          {/* Recent Files - Right Column (spans 2 columns on lg) */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-white rounded-lg shadow p-12 flex items-center justify-center gap-3">
                <Loader2 className="text-purple-500 animate-spin" size={24} />
                <p className="text-gray-600 font-medium">
                  Loading recent files...
                </p>
              </div>
            ) : (
              <RecentFiles files={files} totalFiles={files.length} />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
