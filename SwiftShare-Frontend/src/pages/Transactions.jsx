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
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Receipt className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">
            Transaction History
          </h1>
        </div>
        {error && (
          <div className="text-red-700 mb-6 p-4 bg-red-50 rounded-lg flex items-center gap-3 border border-red-200">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin mr-2" size={20} />
            <span>Loading transactions...</span>
          </div>
        ) : transactions.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <Receipt size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No transactions Yet
            </h3>
            <p className="text-gray-500">
              You have not made any transactions yet. Visit subscription page to
              purchase a plan.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credits Added
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment ID
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(transaction.transactionsDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.planId === "business"
                        ? "Business Plan"
                        : transaction.planId === "plus"
                        ? "Plus Plan"
                        : transaction.planId === "pro"
                        ? "Pro Plan"
                        : transaction.planId === "enterprise"
                        ? "Enterprise Plan"
                        : "Starter Plan"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatAmount(transaction.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.creditsAdded}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
