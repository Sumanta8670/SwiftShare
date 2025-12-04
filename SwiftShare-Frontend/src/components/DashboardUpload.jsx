import { Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import { useRef } from "react";

const DashboardUpload = ({
  files,
  onFileChange,
  onRemoveFile,
  onUpload,
  uploading,
  maxFiles,
}) => {
  const fileInputRef = useRef(null);
  const draggedOverRef = useRef(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    draggedOverRef.current = true;
  };

  const handleDragLeave = () => {
    draggedOverRef.current = false;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    draggedOverRef.current = false;
    const droppedFiles = Array.from(e.dataTransfer.files);
    const event = { target: { files: droppedFiles } };
    onFileChange(event);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl p-6 h-full border border-slate-700 hover:border-orange-500/30 transition-colors">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-orange-500/20 p-2 rounded-lg">
          <Upload className="w-5 h-5 text-orange-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Upload Files</h2>
      </div>

      <p className="text-sm text-gray-400 mb-6 ml-10">
        {files.length} of {maxFiles} files selected
      </p>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all mb-6 ${
          draggedOverRef.current
            ? "border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/10"
            : "border-slate-600 bg-slate-900/50 hover:border-orange-500/50 hover:bg-slate-900"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={onFileChange}
          className="hidden"
          accept="*/*"
        />
        <div className="flex justify-center mb-4">
          <div className="bg-orange-500/20 p-4 rounded-full">
            <Upload className="mx-auto text-orange-400" size={32} />
          </div>
        </div>
        <p className="text-gray-200 font-semibold mb-1">
          Drag and drop your files here
        </p>
        <p className="text-gray-400 text-sm mb-4">or click to browse</p>
        <button
          onClick={handleBrowseClick}
          className="bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2 px-6 rounded-lg font-medium transition-all shadow-lg shadow-orange-500/20"
        >
          Browse Files
        </button>
      </div>

      {/* Selected Files List */}
      {files.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wide flex items-center gap-2">
            <CheckCircle size={16} className="text-green-400" />
            Selected Files ({files.length})
          </h3>
          <div className="space-y-2 mb-6 max-h-64 overflow-y-auto pr-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-slate-900/50 p-3 rounded-lg border border-slate-700 hover:border-orange-500/50 hover:bg-slate-900 transition-all group"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="text-orange-400 text-lg">📄</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-300 truncate group-hover:text-white transition-colors">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveFile(index)}
                  className="ml-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 p-1.5 rounded-lg transition-all"
                  title="Remove file"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Upload Button */}
          <button
            onClick={onUpload}
            disabled={uploading || files.length === 0}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              uploading || files.length === 0
                ? "bg-slate-700/50 text-gray-500 cursor-not-allowed border border-slate-600"
                : "bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white cursor-pointer shadow-lg shadow-orange-500/20"
            }`}
          >
            {uploading ? (
              <>
                <span className="inline-block animate-spin">⟳</span>
                Uploading...
              </>
            ) : (
              <>
                <Upload size={18} />
                Upload {files.length} File{files.length !== 1 ? "s" : ""}
              </>
            )}
          </button>
        </div>
      )}

      {files.length === 0 && (
        <div className="text-center py-4">
          <p className="text-xs text-gray-500">
            Maximum {maxFiles} files per upload
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardUpload;
