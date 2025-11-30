import { Upload, X } from "lucide-react";
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
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Files</h2>
      <p className="text-sm text-gray-600 mb-6">
        {files.length} of {maxFiles} files selected
      </p>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors mb-6 ${
          draggedOverRef.current
            ? "border-purple-500 bg-purple-50"
            : "border-gray-300 bg-gray-50 hover:border-purple-400"
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
        <Upload className="mx-auto mb-3 text-gray-400" size={32} />
        <p className="text-gray-700 font-medium mb-1">
          Drag and drop your files here
        </p>
        <p className="text-gray-500 text-sm mb-4">or click to browse</p>
        <button
          onClick={handleBrowseClick}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          Browse Files
        </button>
      </div>

      {/* Selected Files List */}
      {files.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Selected Files
          </h3>
          <div className="space-y-2 mb-6 max-h-64 overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-purple-600 text-lg">📄</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveFile(index)}
                  className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
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
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
              uploading || files.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
            }`}
          >
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block animate-spin">⟳</span>
                Uploading...
              </span>
            ) : (
              `Upload ${files.length} File${files.length !== 1 ? "s" : ""}`
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardUpload;
