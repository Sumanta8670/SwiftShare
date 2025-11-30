import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import {
  Copy,
  Download,
  Eye,
  File,
  FileIcon,
  FileText,
  Globe,
  Grid,
  Image,
  List,
  Lock,
  Music,
  Trash2,
  Video,
} from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FileCard from "../components/FileCard.jsx";
import { apiEndPoints } from "../utils/apiEndPoints.js";
import ConfirmationDialog from "../components/ConfirmationDialog.jsx";
import LinkShareModal from "../components/LinkShareModal.jsx";

const MyFiles = () => {
  const [files, setFiles] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    fileId: null,
  });
  const [shareModal, setShareModal] = useState({
    isOpen: false,
    fileId: null,
    link: "",
  });

  const fetchFiles = async () => {
    try {
      const token = await getToken();

      const response = await axios.get(apiEndPoints.FETCH_FILES, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setFiles(response.data);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      toast.error("Error fetching files: " + error.message);
    }
  };

  // Toggles the public/private status
  const toggleFile = async (fileToUpdate) => {
    try {
      const token = await getToken();
      await axios.patch(
        apiEndPoints.TOGGLE_FILE_STATUS(fileToUpdate.id),
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFiles(
        files.map((file) =>
          file.id === fileToUpdate.id
            ? { ...file, isPublic: !file.isPublic }
            : file
        )
      );
      toast.success(
        fileToUpdate.isPublic ? "File is now private" : "File is now public"
      );
    } catch (error) {
      console.error("Error toggling file status:", error);
      toast.error("Error toggling file status: " + error.message);
    }
  };

  // Handle file update from FileCard
  const handleFileUpdate = (updatedFile) => {
    setFiles(
      files.map((file) => (file.id === updatedFile.id ? updatedFile : file))
    );
  };

  // Handle file delete from FileCard
  const handleFileDelete = (fileId) => {
    setFiles(files.filter((file) => file.id !== fileId));
  };

  // Download file
  const handleDownload = async (fileId, fileName) => {
    try {
      const token = await getToken();
      const response = await axios.get(apiEndPoints.DOWNLOAD_FILE(fileId), {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Download started");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Error downloading: " + error.message);
    }
  };

  // Delete file after confirmation
  const handleDelete = async () => {
    const fileId = deleteConfirmation.fileId;
    if (!fileId) return;

    try {
      const token = await getToken();
      const response = await axios.delete(apiEndPoints.DELETE_FILE(fileId), {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFiles(files.filter((file) => file.id !== fileId));
      closeDeleteConfirmation();
      toast.success("File deleted successfully");
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Error deleting file: " + error.message);
    }
  };

  // Closes the delete confirmation modal
  const closeDeleteConfirmation = () => {
    setDeleteConfirmation({ isOpen: false, fileId: null });
  };

  // Open delete confirmation
  const openDeleteConfirmation = (fileId) => {
    setDeleteConfirmation({ isOpen: true, fileId });
  };

  // Open the share modal
  const openShareModal = (fileId) => {
    const link = `${window.location.origin}/file/${fileId}`;
    setShareModal({ isOpen: true, fileId, link });
  };

  // Close the share link modal
  const closeShareModal = () => {
    setShareModal({ isOpen: false, fileId: null, link: "" });
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const getFileIcon = (file) => {
    const extension = file.name.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(extension)) {
      return <Image size={20} className="text-purple-500" />;
    }
    if (["mp4", "webm", "mov", "avi", "mkv"].includes(extension)) {
      return <Video size={20} className="text-blue-500" />;
    }
    if (["mp3", "wav", "ogg", "flac", "mp4a"].includes(extension)) {
      return <Music size={20} className="text-green-500" />;
    }
    if (["pdf", "docx", "xlsx", "doc", "rtf", "txt"].includes(extension)) {
      return <FileText size={20} className="text-amber-500" />;
    }
    return <FileIcon size={20} className="text-purple-500" />;
  };

  return (
    <DashboardLayout activeMenu="MyFiles">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Files ({files.length})</h2>
          <div className="flex items-center gap-3">
            <List
              size={24}
              onClick={() => setViewMode("list")}
              className={`cursor-pointer transition-colors ${
                viewMode === "list"
                  ? "text-blue-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            />
            <Grid
              size={24}
              onClick={() => setViewMode("grid")}
              className={`cursor-pointer transition-colors ${
                viewMode === "grid"
                  ? "text-blue-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            />
          </div>
        </div>

        {files.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 flex flex-col items-center justify-center">
            <File size={60} className="text-purple-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No files uploaded yet.
            </h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              Start uploading files to see them listed here. You can upload
              documents, images and other files to share and manage.
            </p>
            <button
              onClick={() => navigate("/upload")}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
            >
              Go to Upload
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {files.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                onFileUpdate={handleFileUpdate}
                onFileDelete={openDeleteConfirmation}
                onTogglePublic={toggleFile}
                onShareLink={openShareModal}
                onDownload={handleDownload}
              />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uploaded
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sharing
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {files.map((file) => (
                  <tr
                    key={file.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      <div className="flex items-center gap-2">
                        {getFileIcon(file)}
                        <span className="max-w-xs truncate">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {(file.size / 1024).toFixed(1)} KB
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {new Date(file.uploadAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleFile(file)}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          {file.isPublic ? (
                            <>
                              <Globe size={20} className="text-green-600" />
                              <span className="group-hover:underline text-green-600">
                                Public
                              </span>
                            </>
                          ) : (
                            <>
                              <Lock size={20} className="text-red-600" />
                              <span className="group-hover:underline text-red-600">
                                Private
                              </span>
                            </>
                          )}
                        </button>
                        {file.isPublic && (
                          <button
                            onClick={() => openShareModal(file.id)}
                            className="flex items-center gap-2 cursor-pointer group text-blue-600"
                          >
                            <Copy size={20} />
                            <span className="group-hover:underline">
                              Copy Link
                            </span>
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleDownload(file.id, file.name)}
                          className="text-gray-500 hover:text-green-600 transition-colors"
                          title="Download"
                        >
                          <Download size={20} />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => openDeleteConfirmation(file.id)}
                          className="text-gray-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                        {file.isPublic && (
                          <a
                            href={`/file/${file.id}`}
                            title="View File"
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-500 hover:text-blue-600 transition-colors"
                          >
                            <Eye size={20} />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Delete confirmation dialog */}
        <ConfirmationDialog
          isOpen={deleteConfirmation.isOpen}
          onClose={closeDeleteConfirmation}
          title="Delete File"
          message="Are you sure you want to delete this file? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDelete}
          confirmButtonClass="bg-red-600 hover:bg-red-700"
        />

        {/* Share link modal */}
        <LinkShareModal
          isOpen={shareModal.isOpen}
          onClose={closeShareModal}
          link={shareModal.link}
        />
      </div>
    </DashboardLayout>
  );
};

export default MyFiles;
