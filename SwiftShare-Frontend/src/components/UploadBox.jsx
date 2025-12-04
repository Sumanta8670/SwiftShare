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
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500/20 p-3 rounded-lg">
            <Upload className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Upload Files</h2>
            <p className="text-xs text-gray-400 mt-1">Secure & encrypted</p>
          </div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 px-4 py-2 rounded-lg">
          <div className="text-sm text-gray-400">
            <span className="font-bold text-blue-400">{remainingCredits}</span>{" "}
            credits
            <span className="text-gray-500"> remaining</span>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
          dragActive
            ? "border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/10"
            : "border-slate-600 bg-slate-900/50 hover:border-orange-500/50 hover:bg-slate-900"
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
          <div className="w-20 h-20 rounded-full bg-linear-to-br from-orange-500/20 to-blue-500/20 flex items-center justify-center border border-orange-500/30">
            <Upload className="w-10 h-10 text-orange-400" />
          </div>

          <div>
            <p className="text-lg font-bold text-white">
              Drag and drop files here
            </p>
            <p className="text-sm text-gray-400 mt-1">
              or click to browse ({remainingCredits} credits available)
            </p>
          </div>

          <button
            type="button"
            className="px-8 py-2.5 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition-all font-semibold shadow-lg shadow-orange-500/20"
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
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <h3 className="text-lg font-bold text-white">
              Selected Files ({files.length})
            </h3>
          </div>
          <div className="space-y-2 mb-6">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-orange-500/50 hover:bg-slate-800 transition-all group"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <File className="w-5 h-5 text-orange-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-200 truncate group-hover:text-orange-400 transition-colors">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveFile(index)}
                  className="p-2 hover:bg-red-500/10 rounded-lg transition-all text-gray-400 hover:text-red-400 shrink-0 ml-2"
                  title="Remove file"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Upload Button */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onUpload}
              disabled={isUploadDisabled}
              className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                isUploadDisabled
                  ? "bg-slate-700/50 text-gray-500 cursor-not-allowed border border-slate-600"
                  : "bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/20 hover:shadow-xl"
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
        <div className="mt-6 p-4 bg-slate-800/30 border border-slate-700 rounded-lg text-center">
          <p className="text-xs text-gray-500">
            ✓ Maximum 5 files per upload • Each file consumes 1 credit • Files
            encrypted with 256-bit AES
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadBox;
