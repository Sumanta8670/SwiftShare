import { useAuth } from "@clerk/clerk-react";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import { useContext, useEffect, useState } from "react";
import { UserCreditsContext } from "../context/UserCreditsContext.jsx";
import axios from "axios";
import { apiEndPoints } from "../utils/apiEndPoints.js";
import {
  Loader2,
  Upload,
  FileIcon,
  TrendingUp,
  Shield,
  Zap,
  BarChart3,
} from "lucide-react";
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

  const stats = [
    {
      label: "Total Files",
      value: files.length,
      icon: FileIcon,
      color: "from-orange-500/20 to-orange-500/5",
    },
    {
      label: "Credits Available",
      value: credits,
      icon: Zap,
      color: "from-blue-500/20 to-blue-500/5",
    },
    {
      label: "Storage Used",
      value:
        files.length > 0
          ? `${(
              files.reduce((sum, f) => sum + f.size, 0) /
              (1024 * 1024)
            ).toFixed(1)} MB`
          : "0 MB",
      icon: BarChart3,
      color: "from-purple-500/20 to-purple-500/5",
    },
  ];

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="p-6 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Drive</h1>
          <p className="text-gray-300">
            Upload, manage and share your files securely
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`bg-linear-to-br ${stat.color} border border-slate-700 rounded-xl p-6 hover:border-orange-500/50 transition-all group cursor-pointer hover:shadow-lg hover:shadow-orange-500/10`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                      {stat.value}
                    </p>
                  </div>
                  <div className="bg-orange-500/20 p-3 rounded-lg group-hover:bg-orange-500/30 transition-all">
                    <Icon className="text-orange-400" size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 border ${
              messageType === "success"
                ? "bg-green-500/10 text-green-400 border-green-500/30"
                : messageType === "error"
                ? "bg-red-500/10 text-red-400 border-red-500/30"
                : "bg-blue-500/10 text-blue-400 border-blue-500/30"
            }`}
          >
            {message}
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
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

          {/* Recent Files */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow p-12 flex items-center justify-center gap-3">
                <Loader2 className="text-orange-400 animate-spin" size={24} />
                <p className="text-gray-300 font-medium">
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
