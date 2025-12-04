import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import { useAuth } from "@clerk/clerk-react";
import { AlertCircle, Loader2, Receipt } from "lucide-react";
import axios from "axios";
import { apiEndPoints } from "../utils/apiEndPoints.js";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        const response = await axios.get(apiEndPoints.PAYMENT_TRANSACTIONS, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Handle both array and object responses
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.transactions || response.data.data || [];

        setTransactions(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to load transactions");
        setTransactions([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [getToken]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatAmount = (amountInPaise) => {
    return `₹${(amountInPaise / 100).toFixed(2)}`;
  };

  return (
    <DashboardLayout activeMenu="Transactions">
      <div className="p-6 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Transaction History
          </h1>
          <p className="text-gray-300">
            View and manage your payment transactions
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-lg flex items-center gap-3 border border-red-500/30">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin mr-2 text-orange-400" size={24} />
            <span className="text-gray-300">Loading transactions...</span>
          </div>
        ) : transactions.length === 0 ? (
          <div className="bg-slate-800/50 border border-slate-700 p-12 rounded-xl text-center">
            <Receipt size={48} className="mx-auto mb-4 text-slate-600" />
            <h3 className="text-lg font-medium text-white mb-2">
              No Transactions Yet
            </h3>
            <p className="text-gray-400">
              You have not made any transactions yet. Visit the subscription
              page to purchase a plan.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
              <thead className="bg-slate-800 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Credits Added
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Payment ID
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatDate(transaction.transactionsDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs font-semibold">
                        {transaction.planId === "business"
                          ? "Business"
                          : transaction.planId === "plus"
                          ? "Plus"
                          : transaction.planId === "pro"
                          ? "Pro"
                          : transaction.planId === "enterprise"
                          ? "Enterprise"
                          : "Starter"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-orange-400">
                      {formatAmount(transaction.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {transaction.creditsAdded}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {transaction.paymentId
                        ? transaction.paymentId.substring(0, 12) + "..."
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
