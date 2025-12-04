import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";

const ConfirmationDialog = ({
  isOpen,
  onClose,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  confirmButtonClass = "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-500/20",
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-4">
        {/* Warning Icon */}
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-linear-to-br from-red-500/20 to-red-500/10 rounded-full border border-red-500/30 group hover:border-red-500/50 transition-colors">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>

        {/* Message */}
        <p className="text-center text-gray-300 leading-relaxed">{message}</p>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-300 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg transition-all duration-200 hover:border-slate-500"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-all duration-200 ${confirmButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;
