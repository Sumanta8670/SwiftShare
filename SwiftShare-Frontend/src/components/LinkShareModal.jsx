import { Copy, Check } from "lucide-react";
import { useState } from "react";
import Modal from "./Modal";
import toast from "react-hot-toast";

const LinkShareModal = ({ isOpen, onClose, link }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success("Link copied to clipboard!");

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share File" size="md">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Share this link with others to give them access to this file
        </p>

        {/* Link Display Box */}
        <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <input
            type="text"
            value={link}
            readOnly
            className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
          />
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-gray-200 rounded-md transition-colors"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        <p className="text-xs text-gray-500">
          Anyone with this link can access this file
        </p>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LinkShareModal;
