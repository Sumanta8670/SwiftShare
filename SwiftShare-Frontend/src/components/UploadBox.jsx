import { Upload, X, File, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

const UploadBox = ({
  files,
  onFileChange,
  onRemoveFile,
  onUpload,
  uploading,
  remainingCredits,
  isUploadDisabled,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Upload className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Upload Files</h2>
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">{remainingCredits}</span> credits
          remaining
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-white hover:border-blue-400 hover:bg-gray-50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={onFileChange}
          className="hidden"
          accept="*/*"
        />

        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>

          <div>
            <p className="text-lg font-medium text-gray-700">
              Drag and drop files here
            </p>
            <p className="text-sm text-gray-500 mt-1">
              or click to browse ({remainingCredits} credits remaining)
            </p>
          </div>

          <button
            type="button"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Browse Files
          </button>
        </div>
      </div>

      {/* Selected Files List */}
      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Selected Files ({files.length})
          </h3>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <File className="w-5 h-5 text-blue-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveFile(index)}
                  className="p-1 hover:bg-red-100 rounded-full transition-colors shrink-0"
                  title="Remove file"
                >
                  <X className="w-5 h-5 text-red-600" />
                </button>
              </div>
            ))}
          </div>

          {/* Upload Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onUpload}
              disabled={isUploadDisabled}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                isUploadDisabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
              }`}
            >
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Upload Files
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Info Text */}
      {files.length === 0 && (
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Maximum 5 files per upload. Each file consumes 1 credit.
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadBox;
