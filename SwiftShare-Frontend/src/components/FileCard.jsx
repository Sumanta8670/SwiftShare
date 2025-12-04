import {
  Copy,
  Download,
  Eye,
  FileIcon,
  FileText,
  Globe,
  Image,
  Lock,
  Music,
  Trash2,
  Video,
  Share2,
} from "lucide-react";
import { useState } from "react";

const FileCard = ({
  file,
  onFileUpdate,
  onFileDelete,
  onTogglePublic,
  onDownload,
  onShareLink,
}) => {
  const [showActions, setShowActions] = useState(false);

  const getFileIcon = (file) => {
    const extension = file.name.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(extension)) {
      return <Image size={40} className="text-purple-400" />;
    }
    if (["mp4", "webm", "mov", "avi", "mkv"].includes(extension)) {
      return <Video size={40} className="text-blue-400" />;
    }
    if (["mp3", "wav", "ogg", "flac", "mp4a"].includes(extension)) {
      return <Music size={40} className="text-green-400" />;
    }
    if (["pdf", "docx", "xlsx", "doc", "rtf", "txt"].includes(extension)) {
      return <FileText size={40} className="text-orange-400" />;
    }
    return <FileIcon size={40} className="text-purple-400" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    } else {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleViewFile = (e) => {
    e.preventDefault();
    // Open in new tab
    const url = `${window.location.origin}/file/${file.id}`;
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <div
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      className="relative group overflow-hidden rounded-xl bg-linear-to-br from-slate-800 to-slate-900 shadow-lg hover:shadow-xl border border-slate-700 hover:border-orange-500/50 transition-all duration-300"
    >
      {/* File preview section */}
      <div className="h-32 bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center p-4">
        {getFileIcon(file)}
      </div>

      {/* Status Badge */}
      <div className="absolute top-3 right-3">
        <div
          className={`rounded-full p-2 border backdrop-blur-sm transition-all ${
            file.isPublic
              ? "bg-green-500/20 border-green-500/50"
              : "bg-slate-800/80 border-slate-600"
          }`}
          title={file.isPublic ? "Public" : "Private"}
        >
          {file.isPublic ? (
            <Globe size={16} className="text-green-400" />
          ) : (
            <Lock size={16} className="text-gray-400" />
          )}
        </div>
      </div>

      {/* File details section */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="overflow-hidden flex-1">
            <h3
              title={file.name}
              className="font-semibold text-gray-100 truncate group-hover:text-orange-400 transition-colors"
            >
              {file.name}
            </h3>
            <p className="text-xs text-gray-500 mt-2">
              {formatFileSize(file.size)} · {formatDate(file.uploadAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons Overlay */}
      <div
        className={`absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center p-4 transition-all duration-300 ${
          showActions ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex gap-2 w-full justify-center flex-wrap">
          {file.isPublic && (
            <button
              onClick={() => onShareLink(file.id)}
              title="Copy share link"
              className="p-2.5 bg-white/90 hover:bg-white rounded-full transition-all text-orange-500 hover:text-orange-600 shadow-lg hover:shadow-xl"
            >
              <Copy size={18} />
            </button>
          )}

          {file.isPublic && (
            <button
              onClick={handleViewFile}
              title="View public file"
              className="p-2.5 bg-white/90 hover:bg-white rounded-full transition-all text-blue-500 hover:text-blue-600 shadow-lg hover:shadow-xl"
            >
              <Eye size={18} />
            </button>
          )}

          <button
            onClick={() => onDownload(file.id, file.name)}
            title="Download"
            className="p-2.5 bg-white/90 hover:bg-white rounded-full transition-all text-green-500 hover:text-green-600 shadow-lg hover:shadow-xl"
          >
            <Download size={18} />
          </button>

          <button
            onClick={() => onTogglePublic(file)}
            title={file.isPublic ? "Make Private" : "Make Public"}
            className="p-2.5 bg-white/90 hover:bg-white rounded-full transition-all text-purple-500 hover:text-purple-600 shadow-lg hover:shadow-xl"
          >
            {file.isPublic ? <Lock size={18} /> : <Globe size={18} />}
          </button>

          <button
            onClick={() => onFileDelete(file.id)}
            title="Delete"
            className="p-2.5 bg-white/90 hover:bg-white rounded-full transition-all text-red-500 hover:text-red-600 shadow-lg hover:shadow-xl"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
