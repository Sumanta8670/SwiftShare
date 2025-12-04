import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children, title, size = "md" }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={`relative w-full ${sizeClasses[size]} mx-4 animate-in zoom-in-95 duration-300`}
      >
        <div className="relative bg-linear-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl border border-slate-700 hover:border-orange-500/30 transition-colors">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
            <h3 className="text-lg font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {title}
            </h3>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-400 hover:text-orange-400 hover:bg-slate-700/50 rounded-lg p-1.5 transition-all duration-200 group"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
