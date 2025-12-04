import { Copy, Check, Share2 } from "lucide-react";
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

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share File" size="md">
      <div className="space-y-5">
        <div className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <Share2 size={18} className="text-blue-400 shrink-0" />
          <p className="text-sm text-gray-300">
            Share this link with others to give them access to this file
          </p>
        </div>

        {/* Link Display Box */}
        <div className="flex items-center gap-2 p-4 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-orange-500/50 transition-all group">
          <input
            type="text"
            value={link}
            readOnly
            className="flex-1 bg-transparent text-sm text-gray-300 outline-none font-mono"
          />
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-slate-700 rounded-md transition-all text-gray-400 hover:text-orange-400 group-hover:text-orange-400"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-400 animate-pulse" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
          <p className="text-xs text-gray-400">
            ✓ Anyone with this link can access and download this file
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-300 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg transition-all"
          >
            Close
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-2 text-sm font-medium text-white bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-orange-500/20"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Link
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LinkShareModal;
