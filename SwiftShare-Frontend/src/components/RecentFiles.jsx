import { Download, Share2, Lock, Globe } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const RecentFiles = ({ files, totalFiles }) => {
  const { getToken } = useAuth();

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    const iconMap = {
      pdf: "📄",
      doc: "📝",
      docx: "📝",
      xls: "📊",
      xlsx: "📊",
      ppt: "🎯",
      pptx: "🎯",
      jpg: "🖼️",
      jpeg: "🖼️",
      png: "🖼️",
      gif: "🖼️",
      mp4: "🎬",
      mp3: "🎵",
      zip: "🗜️",
    };
    return iconMap[ext] || "📄";
  };

  const handleDownload = async (fileId, fileName) => {
    try {
      const token = await getToken();
      const response = await axios.get(`/files/download/${fileId}`, {
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
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Recent Files ({totalFiles})
        </h2>
      </div>

      {files.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-gray-500 text-lg">
            No files yet. Upload your first file!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left">
                <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Uploaded By
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Modified
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Sharing
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getFileIcon(file.name)}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {file.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatFileSize(file.size)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    You
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(file.uploadAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {file.isPublic ? (
                        <>
                          <Globe size={16} className="text-blue-600" />
                          <span className="text-xs font-medium text-blue-600">
                            Public
                          </span>
                        </>
                      ) : (
                        <>
                          <Lock size={16} className="text-gray-600" />
                          <span className="text-xs font-medium text-gray-600">
                            Private
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDownload(file.id, file.name)}
                        className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
                        title="Download file"
                      >
                        <Download size={18} />
                      </button>
                      <button
                        className="text-gray-600 hover:text-purple-600 p-1 hover:bg-purple-50 rounded transition-colors"
                        title="Share file"
                      >
                        <Share2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentFiles;
