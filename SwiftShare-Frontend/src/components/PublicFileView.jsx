import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import {
  Copy,
  Download,
  File,
  Info,
  Share2,
  Lock,
  CheckCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import LinkShareModal from "./LinkShareModal.jsx";

const BASE_URL = "http://localhost:8080/api/auth";

const PublicFileView = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shareModalOpen, setShareModalOpen] = useState({
    isOpen: false,
    link: "",
  });
  const { getToken } = useAuth();
  const { fileId } = useParams();

  useEffect(() => {
    const getFile = async () => {
      setIsLoading(true);
      try {
        console.log("Fetching public file:", fileId);
        // Use the correct API endpoint without authentication
        const res = await axios.get(`${BASE_URL}/files/public/${fileId}`, {
          // No authorization header needed for public files
        });
        console.log("File fetched successfully:", res.data);
        setFile(res.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching public file:", error);
        setError(
          error.response?.data?.error || error.message || "Failed to load file"
        );
      } finally {
        setIsLoading(false);
      }
    };
    getFile();
  }, [fileId]);

  const handleDownload = async () => {
    try {
      console.log("Starting download for file:", fileId);
      const response = await axios.get(`${BASE_URL}/files/download/${fileId}`, {
        responseType: "blob",
        // No auth header needed for public file download
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Download started");
      console.log("File downloaded successfully");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Error downloading: " + error.message);
    }
  };

  const openShareModal = () => {
    const link = `${window.location.origin}/file/${fileId}`;
    console.log("Generated share link:", link);
    setShareModalOpen({ isOpen: true, link });
  };

  const closeShareModal = () => {
    setShareModalOpen({ isOpen: false, link: "" });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="inline-block animate-spin mb-4">
            <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-400 rounded-full"></div>
          </div>
          <p className="text-gray-400 text-lg">Loading file...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center p-12 bg-linear-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl border border-slate-700 max-w-md">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30">
            <File className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-2 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  if (!file) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="p-6 border-b border-slate-700/50 bg-linear-to-br from-slate-800 to-slate-900 shadow-xl">
        <div className="container mx-auto flex justify-between items-center">
          <div
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => (window.location.href = "/")}
          >
            <div className="bg-linear-to-br from-orange-500 to-blue-500 p-2 rounded-lg shadow-lg">
              <Share2 className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-2xl bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                SwiftShare
              </h1>
              <p className="text-xs text-gray-500">Secure File Sharing</p>
            </div>
          </div>
          <button
            onClick={openShareModal}
            className="flex items-center gap-2 bg-linear-to-r from-orange-500/20 to-orange-500/10 text-orange-400 px-4 py-2 rounded-lg hover:from-orange-500/30 hover:to-orange-500/20 transition-all border border-orange-500/30 hover:border-orange-500/50 font-medium"
          >
            <Copy size={18} />
            Share Link
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-8 flex justify-center">
        <div className="w-full max-w-3xl space-y-8">
          {/* File Card */}
          <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl shadow-2xl p-10 text-center hover:border-orange-500/30 transition-colors">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-linear-to-br from-blue-500/20 to-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/30">
                <File size={48} className="text-blue-400" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white wrap-break-word mb-3">
              {file.name}
            </h1>

            <p className="text-gray-400 mb-6">
              <span className="text-orange-400 font-semibold">
                {file.size ? (file.size / (1024 * 1024)).toFixed(2) : "0"} MB
              </span>
              <span className="mx-3 text-gray-600">•</span>
              <span>
                Shared on{" "}
                {new Date(file.uploadAt || file.uploadedAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
            </p>

            <div className="my-8">
              <span className="inline-block bg-linear-to-r from-orange-500/20 to-orange-500/10 text-orange-400 text-xs font-bold px-4 py-2 rounded-full border border-orange-500/30">
                {file.type || "File"}
              </span>
            </div>

            <div className="flex justify-center gap-4 my-8">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-8 py-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg shadow-blue-500/20"
              >
                <Download size={20} />
                Download File
              </button>
              <button
                onClick={openShareModal}
                className="flex items-center gap-2 px-8 py-3 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-semibold transition-all shadow-lg shadow-orange-500/20"
              >
                <Copy size={20} />
                Copy Link
              </button>
            </div>

            <div className="border-t border-slate-700 pt-8 my-8">
              <h3 className="text-lg font-bold text-white text-left mb-6">
                📋 File Information
              </h3>
              <div className="text-left space-y-4">
                <div className="flex justify-between bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                  <span className="text-gray-500">File Name</span>
                  <span className="text-gray-200 font-medium break-all">
                    {file.name}
                  </span>
                </div>
                <div className="flex justify-between bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                  <span className="text-gray-500">File Size</span>
                  <span className="text-gray-200 font-medium">
                    {file.size ? (file.size / (1024 * 1024)).toFixed(2) : "0"}{" "}
                    MB
                  </span>
                </div>
                <div className="flex justify-between bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                  <span className="text-gray-500">File Type</span>
                  <span className="text-gray-200 font-medium">
                    {file.type || "File"}
                  </span>
                </div>
                <div className="flex justify-between bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                  <span className="text-gray-500">Upload Date</span>
                  <span className="text-gray-200 font-medium">
                    {new Date(
                      file.uploadAt || file.uploadedAt
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-linear-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/30 text-blue-300 p-6 rounded-xl flex gap-4">
            <Info size={24} className="shrink-0 mt-0.5 text-blue-400" />
            <div>
              <h4 className="font-semibold text-blue-200 mb-1">
                Public Access
              </h4>
              <p className="text-sm">
                This file has been shared publicly and can be downloaded by
                anyone with this link. No account required. All downloads are
                encrypted and secure.
              </p>
            </div>
          </div>

          {/* Security Info */}
          <div className="bg-linear-to-r from-green-500/10 to-green-500/5 border border-green-500/30 rounded-xl p-6 flex gap-4">
            <CheckCircle size={24} className="shrink-0 text-green-400" />
            <div>
              <h4 className="font-semibold text-green-200 mb-1">
                Secure & Encrypted
              </h4>
              <p className="text-sm text-green-300">
                This file is protected with 256-bit AES encryption and SSL/TLS
                security protocols.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Share Modal */}
      <LinkShareModal
        isOpen={shareModalOpen.isOpen}
        onClose={closeShareModal}
        link={shareModalOpen.link}
      />
    </div>
  );
};

export default PublicFileView;
