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
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Subscription Plans</h1>
        <p className="text-gray-600 mb-6">Choose a plan that works for you</p>
        {message && (
          <div
            className={`mb-4 p-3 rounded-lg flex items-center gap-3 ${
              messageType === "success"
                ? "bg-green-100 text-green-800"
                : messageType === "error"
                ? "bg-red-100 text-red-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {messageType === "error" && <AlertCircle size={20} />}
            {message}
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="text-blue-600" />
              <h2 className="text-lg font-medium">
                Current Credits:{" "}
                <span className="font-bold text-purple-500">{credits}</span>
              </h2>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              You can upload {credits} files. Upgrade your plan to get more
              credits!
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-xl p-6 ${
                plan.recommended
                  ? "border-blue-200 bg-purple-50 shadow-md"
                  : "border-gray-300 bg-white"
              }`}
            >
              {plan.recommended && (
                <div className="inline-block bg-purple-500 text-white text-xs font-semibold">
                  Recommended
                </div>
              )}
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <div className="mt-2 mb-4">
                <span className="text-3xl font-bold">₹{plan.price}</span>{" "}
                <span className="text-gray-500 text-sm">
                  / month for {plan.credits} credits
                </span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check
                      size={18}
                      className="text-green-500 mr-2 mt-0.5 shrink-0"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePurchase(plan)}
                disabled={processingPayment}
                className={`w-full py-2 rounded-md font-medium transition-colors ${
                  plan.recommended
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-white border border-purple-500 text-purple-500 hover:bg-blue-700"
                }disabled:opacity-50 flex items-center justify-center gap-2`}
              >
                {processingPayment ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Subscribe to {plan.name}</span>
                )}
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium mb-2">How Credits Works</h3>
          <p className="text-sm text-gray-600">
            Each credit allows you to upload one file. For example, if you have
            10 credits, you can upload 10 files. Credits never expire and can be
            used at any time. When you subscribe to a plan, your credits are
            added to your account balance. You can use your credits to upload
            files until you run out of credits. To upload more files, simply
            subscribe to a higher plan or renew your subscription to get
            additional credits.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Subscription;
