import { Download, Share2, Lock, Globe, FileText } from "lucide-react";
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
    <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl overflow-hidden border border-slate-700 hover:border-orange-500/30 transition-colors">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/20 p-2 rounded-lg">
            <FileText className="w-5 h-5 text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-white">
            Recent Files
            <span className="text-gray-400 font-normal text-base ml-2">
              ({totalFiles})
            </span>
          </h2>
        </div>
      </div>

      {files.length === 0 ? (
        <div className="p-12 text-center">
          <FileText className="w-12 h-12 text-slate-700 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">
            No files yet. Upload your first file!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50 border-b border-slate-700">
              <tr className="text-left">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Uploaded By
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Modified
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {files.map((file) => (
                <tr
                  key={file.id}
                  className="hover:bg-slate-800/50 transition-all duration-200 border-b border-slate-700/30"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getFileIcon(file.name)}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-200 truncate hover:text-orange-400 transition-colors">
                          {file.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {formatFileSize(file.size)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    You
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {formatDate(file.uploadAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {file.isPublic ? (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                          <Globe size={14} className="text-green-400" />
                          <span className="text-xs font-medium text-green-400">
                            Public
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-700/50 border border-slate-600 rounded-full">
                          <Lock size={14} className="text-gray-400" />
                          <span className="text-xs font-medium text-gray-400">
                            Private
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDownload(file.id, file.name)}
                        className="text-blue-400 hover:text-blue-300 p-2 hover:bg-blue-500/10 rounded-lg transition-all"
                        title="Download file"
                      >
                        <Download size={18} />
                      </button>
                      <button
                        className="text-orange-400 hover:text-orange-300 p-2 hover:bg-orange-500/10 rounded-lg transition-all"
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
