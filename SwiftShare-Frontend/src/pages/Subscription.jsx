import { useAuth, useUser } from "@clerk/clerk-react";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import { UserCreditsContext } from "../context/UserCreditsContext.jsx";
import { features } from "../assets/data.js";
import { apiEndPoints } from "../utils/apiEndPoints.js";
import axios from "axios";
import { Check, CreditCard, Loader2, AlertCircle } from "lucide-react";

const Subscription = () => {
  const [processingPayment, setProcessingPayment] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success", "error", or "info"
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const { getToken } = useAuth();
  const razorpayScriptRef = useRef(null);
  const { credits, fetchUserCredits, setCredits } =
    useContext(UserCreditsContext);
  const { user } = useUser();

  // Plans Configuration
  const plans = [
    {
      id: "plus",
      name: "Plus",
      price: 999, // in INR
      credits: 500,
      features: [
        "500 file uploads per month",
        "Password-protected links",
        "30-day file retention",
        "Priority encryption",
        "Email support (48hr response)",
        "Basic analytics",
      ],
      recommended: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: 2499, // in INR
      credits: 2000,
      features: [
        "2,000 file uploads per month",
        "Advanced sharing controls",
        "90-day file retention",
        "Priority support (24hr response)",
        "Advanced analytics dashboard",
        "Custom branding",
        "Collaboration tools",
        "Team workspaces (up to 10 members)",
      ],
      recommended: false,
    },
    {
      id: "business",
      name: "Business",
      price: 4999, // in INR
      credits: 5000,
      features: [
        "5,000 file uploads per month",
        "Enterprise-grade sharing",
        "180-day file retention",
        "Premium support (12hr response)",
        "Custom analytics & reports",
        "White-label branding",
        "Advanced team management",
        "API access (10K calls/month)",
        "Dedicated storage pools",
      ],
      recommended: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 9999, // in INR
      credits: 1000000000,
      features: [
        "Unlimited file uploads",
        "Enterprise SSO & permissions",
        "Lifetime file retention",
        "Dedicated account manager",
        "Real-time analytics & BI tools",
        "Full API access (unlimited)",
        "Complete white-label solutions",
        "Custom integrations & workflows",
        "SLA guarantees (99.9% uptime)",
        "On-premise deployment options",
      ],
      recommended: false,
    },
  ];

  //Load Razorpay Script
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        setRazorpayLoaded(true);
      };
      script.onerror = () => {
        console.error("Razorpay Script failed to load.");
        setMessage("Failed to load payment gateway. Please try again later.");
        setMessageType("error");
      };
      razorpayScriptRef.current = script;
      document.body.appendChild(script);
    } else {
      setRazorpayLoaded(true);
    }

    return () => {
      if (razorpayScriptRef.current) {
        document.body.removeChild(razorpayScriptRef.current);
      }
    };
  }, []);

  //Fetch user credits after successful payment
  useEffect(() => {
    const fetchUserCredits = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(apiEndPoints.GET_CREDITS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setCredits(response.data.credits);
        } else {
          console.error("Failed to fetch user credits");
        }
      } catch (error) {
        console.error("Error fetching user credits:", error);
        setMessage("Error fetching updated credits.");
        setMessageType("error");
      }
    };
    fetchUserCredits();
  }, [getToken]);

  const handlePurchase = async (plan) => {
    if (!razorpayLoaded) {
      setMessage("Payment gateway is not loaded. Please try again later.");
      setMessageType("error");
      return;
    }
    setProcessingPayment(true);
    setMessage("");
    try {
      const token = await getToken();
      //Create order on backend
      const orderResponse = await axios.post(
        apiEndPoints.PAYMENT_TRANSACTIONS_CREATE_ORDER,
        {
          planId: plan.id,
          amount: plan.price * 100,
          currency: "INR",
          credits: plan.credits,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { orderId, amount, currency } = orderResponse.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: plan.price * 100,
        currency: currency,
        name: "SwiftShare",
        description: `${plan.name} Plan Subscription`,
        order_id: orderId, // FIXED: Changed from response.data.orderId to orderId
        handler: async function (response) {
          //Verify payment on backend
          try {
            const verifyResponse = await axios.post(
              apiEndPoints.PAYMENT_TRANSACTIONS_VERIFY_PAYMENT,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planId: plan.id,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (verifyResponse.data.success) {
              if (verifyResponse.data.credits) {
                console.log(
                  "Updating credits to:",
                  verifyResponse.data.credits
                );
                setCredits(verifyResponse.data.credits);
              } else {
                console.log("Credits not in response, fetching latest credits");
                await fetchUserCredits();
              }
              setMessage(
                `Payment successful! ${plan.name} Credits have been added.`
              );
              setMessageType("success");
            } else {
              setMessage(
                "Payment verification failed. Please contact support."
              );
              setMessageType("error");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            setMessage("Error verifying payment. Please contact support.");
            setMessageType("error");
          }
        },
        prefill: {
          name: user.fullName,
          email: user.primaryEmailAddress,
        },
        theme: {
          color: "#6b46c1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error during payment process:", error);
      setMessage("Error initiating payment. Please try again.");
      setMessageType("error");
    } finally {
      setProcessingPayment(false);
    }
  };
  return (
    <DashboardLayout activeMenu="Subscription">
      <div className="p-6 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Subscription Plans
          </h1>
          <p className="text-gray-300">Choose a plan that works for you</p>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 border ${
              messageType === "success"
                ? "bg-green-500/10 text-green-400 border-green-500/30"
                : messageType === "error"
                ? "bg-red-500/10 text-red-400 border-red-500/30"
                : "bg-blue-500/10 text-blue-400 border-blue-500/30"
            }`}
          >
            {messageType === "error" && <AlertCircle size={20} />}
            {message}
          </div>
        )}

        {/* Credits Display */}
        <div className="mb-8 bg-linear-to-r from-orange-500/10 to-blue-500/10 border border-orange-500/30 rounded-xl p-6 hover:border-orange-500/50 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-2">
                Current Credits Balance
              </p>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">
                {credits}
              </p>
            </div>
            <div className="bg-orange-500/20 p-4 rounded-lg">
              <CreditCard className="text-orange-400" size={32} />
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            You can upload {credits} files with your current credits. Upgrade
            your plan to get more!
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl overflow-hidden transition-all border flex flex-col ${
                plan.recommended
                  ? "bg-linear-to-br from-orange-500/20 to-blue-500/20 border-orange-500 shadow-2xl shadow-orange-500/20 lg:scale-105"
                  : "bg-slate-800/50 border-slate-700 hover:border-orange-500/50"
              }`}
            >
              {plan.recommended && (
                <div className="px-6 pt-4 pb-0">
                  <div className="inline-block bg-linear-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    RECOMMENDED
                  </div>
                </div>
              )}
              <div className="flex-1 p-6 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4 h-8">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-white">
                    ₹{plan.price}
                  </span>
                  <span className="text-gray-400 text-sm ml-2">/month</span>
                </div>
                <button
                  onClick={() => handlePurchase(plan)}
                  disabled={processingPayment}
                  className={`w-full py-3 rounded-lg font-semibold transition-all mb-6 flex items-center justify-center gap-2 ${
                    plan.recommended
                      ? "bg-linear-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
                      : "border border-orange-500 text-orange-400 hover:bg-orange-500/10"
                  }`}
                >
                  {processingPayment ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Processing...
                    </>
                  ) : (
                    `Subscribe to ${plan.name}`
                  )}
                </button>
                <div className="space-y-2 text-sm">
                  {plan.features.slice(0, 4).map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check
                        size={14}
                        className="text-orange-400 mt-1 shrink-0"
                      />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                  {plan.features.length > 4 && (
                    <p className="text-orange-400 font-semibold text-xs pt-2">
                      + {plan.features.length - 4} more features
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-orange-500/50 transition-all">
          <h3 className="text-xl font-bold text-white mb-4">
            How Credits Work
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Each credit allows you to upload one file. Your credits never expire
            and can be used anytime. When you subscribe to a plan, your credits
            are instantly added to your account. Upgrade anytime to increase
            your uploading capacity.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Subscription;
