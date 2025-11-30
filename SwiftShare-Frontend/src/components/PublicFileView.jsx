import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { Copy, Download, File, Info, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import LinkShareModal from "./LinkShareModal.jsx";

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
        const res = await axios.get(apiEndPoints.PUBLIC_FILE_VIEW(fileId));
        setFile(res.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching public file:", error);
        setError("Failed to load file");
      } finally {
        setIsLoading(false);
      }
    };
    getFile();
  }, [fileId, getToken]);

  const handleDownload = async () => {
    try {
      // Implement download functionality here
      const response = await axios.get(apiEndPoints.DOWNLOAD_FILE(fileId), {
        responseType: "blob", // Important for file downloads
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.name); // Use the actual file name
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Error downloading: " + error.message);
    }
  };

  const openShareModal = () => {
    setShareModalOpen({ isOpen: false, link: "" });
  };

  const closeShareModel = () => {
    setShareModalOpen({ isOpen: false, link: "" });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-600">Loading files...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600">Error</h2>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }
  if (!file) return null;
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="p-4 border-b bg-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Share2 className="text-blue-600" />
            <span className="font-bold text-xl text-gray-800">SwiftShare</span>
          </div>
          <button
            onClick={openShareModal}
            className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Copy size={18} />
            Share Link
          </button>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8 flex justify-center">
        <div className="w-full max-w-3xl">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <File size={40} className="text-blue-600" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 wrap-break-word">
              {file.name}
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
              <span className="mx-2">&bull</span>
              Shared on {new Date(file.uploadedAt).toLocaleDateString()}
            </p>
            <div className="my-6">
              <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-lg">
                {file.type || "File"}
              </span>
            </div>
            <div className="flex justify-center gap-4 my-8">
              <button
                onClick={handleDownload}
                className="flex items-centerpx-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                Download File
              </button>
            </div>
            <hr className="my-8" />
            <div>
              <h3 className="text-lg font-semibold text-left text-gray-800 mb-4">
                File Information
              </h3>
              <div className="text-left text-sm space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">File Name:</span>
                  <span className="text-gray-800 font-medium break-all">
                    {file.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">File Size:</span>
                  <span className="text-gray-800 font-medium">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">File Type:</span>
                  <span className="text-gray-800 font-medium">
                    {file.type || "File"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Uploaded On:</span>
                  <span className="text-gray-800 font-medium">
                    {new Date(file.uploadedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg">
            <Info size={20} />
            <p className="text-sm">
              This file has been shared publicly and can be downloaded by
              anyone.
            </p>
          </div>
        </div>
      </main>
      <LinkShareModal
        isOpen={shareModalOpen.isOpen}
        onClose={closeShareModel}
        link={shareModalOpen.link}
        title="Share File Link"
      />
    </div>
  );
};

export default PublicFileView;
