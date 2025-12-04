import { CreditCard, Zap } from "lucide-react";

const CreditDisplay = ({ credits }) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-linear-to-r from-orange-500/10 to-blue-500/10 hover:border-orange-500/50 transition-all group">
      <div className="bg-orange-500/20 p-1.5 rounded-full group-hover:bg-orange-500/30 transition-colors">
        <CreditCard size={16} className="text-orange-400" />
      </div>
      <span className="font-bold text-orange-400">{credits}</span>
      <span className="text-xs text-gray-400">Credits</span>
    </div>
  );
};

export default CreditDisplay;
