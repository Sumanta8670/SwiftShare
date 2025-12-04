import { pricePlans } from "../assets/data.js";
import {
  Check,
  X,
  ArrowRight,
  Zap,
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Pricing = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState("monthly");

  const faqs = [
    {
      q: "Can I change my plan anytime?",
      a: "Yes! Upgrade or downgrade instantly with prorated billing.",
    },
    {
      q: "What happens if I downgrade?",
      a: "Your files remain safe. We'll prorate your billing accordingly.",
    },
    {
      q: "Is there a money-back guarantee?",
      a: "Absolutely! 30-day money-back guarantee on all plans.",
    },
    {
      q: "Do you offer annual discounts?",
      a: "Yes! Get 20% off with annual billing.",
    },
    {
      q: "What payment methods accepted?",
      a: "All major cards, PayPal, and bank transfers.",
    },
    {
      q: "Is there a free trial?",
      a: "Yes, 14 days free. No credit card required.",
    },
  ];

  const comparison = [
    {
      feature: "Monthly uploads",
      plans: [100, 500, 2000, 5000, "Unlimited"],
      type: "number",
    },
    {
      feature: "File retention",
      plans: ["14 days", "30 days", "90 days", "180 days", "Lifetime"],
      type: "text",
    },
    {
      feature: "Team members",
      plans: [1, 5, 10, 25, "Unlimited"],
      type: "number",
    },
    {
      feature: "Storage limit",
      plans: ["5GB", "50GB", "500GB", "2TB", "Unlimited"],
      type: "number",
    },
    {
      feature: "Support",
      plans: [
        "Community",
        "Email (48h)",
        "Priority (24h)",
        "Premium (12h)",
        "Dedicated",
      ],
      type: "text",
    },
    {
      feature: "Custom branding",
      plans: [false, false, true, true, true],
      type: "boolean",
    },
    {
      feature: "API access",
      plans: [false, false, "Limited", true, true],
      type: "mixed",
    },
    {
      feature: "Advanced analytics",
      plans: [false, false, true, true, true],
      type: "boolean",
    },
    {
      feature: "SSO/SAML",
      plans: [false, false, false, true, true],
      type: "boolean",
    },
    {
      feature: "Dedicated manager",
      plans: [false, false, false, false, true],
      type: "boolean",
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-8">
            <Zap size={16} className="text-orange-400" />
            <span className="text-orange-400 font-medium text-sm">
              Transparent Pricing
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Plans for Every{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">
              Stage
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Choose the perfect plan for your needs. Always flexible, never
            locked in.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-slate-800/50 border border-slate-700 rounded-full p-1 mb-8">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "text-gray-400"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                billingCycle === "annual"
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "text-gray-400"
              }`}
            >
              Annual{" "}
              <span className="text-green-400 text-sm ml-1">Save 20%</span>
            </button>
          </div>

          <p className="text-gray-400 text-sm">
            💡 14-day free trial • No credit card needed
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {pricePlans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-xl overflow-hidden transition-all h-full flex flex-col group ${
                  plan.highlighted
                    ? "bg-linear-to-br from-orange-500/20 to-blue-500/20 border-2 border-orange-500 shadow-2xl shadow-orange-500/20 lg:scale-105"
                    : "bg-slate-800/50 border border-slate-700 hover:border-orange-500/50"
                }`}
              >
                {/* Header Section */}
                <div className="px-4 pt-4 pb-3 shrink-0">
                  {plan.highlighted && (
                    <div className="inline-block bg-linear-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-3 py-0.5 rounded-full mb-2">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                    {plan.description}
                  </p>
                </div>

                {/* Price Section */}
                <div className="px-4 py-2 shrink-0 border-b border-slate-700">
                  <span className="text-3xl font-bold text-white">
                    {typeof plan.price === "number"
                      ? "₹" +
                        (billingCycle === "annual"
                          ? Math.round(plan.price * 12 * 0.8)
                          : plan.price
                        ).toLocaleString()
                      : plan.price}
                  </span>
                  {plan.price !== 0 && plan.price !== "Custom" && (
                    <span className="text-gray-400 text-xs ml-1">
                      /{billingCycle === "annual" ? "year" : "month"}
                    </span>
                  )}
                  {billingCycle === "annual" &&
                    typeof plan.price === "number" &&
                    plan.price !== 0 && (
                      <p className="text-green-400 text-xs mt-0.5 font-semibold">
                        Save ₹
                        {Math.round(plan.price * 12 * 0.2).toLocaleString()}
                      </p>
                    )}
                </div>

                {/* CTA Button */}
                <div className="px-4 py-2 shrink-0 border-b border-slate-700">
                  <button
                    onClick={() =>
                      navigate(
                        plan.price === 0 ? "/dashboard" : "/subscription"
                      )
                    }
                    className={`w-full py-2 px-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-1 text-sm ${
                      plan.highlighted
                        ? "bg-linear-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
                        : "border border-orange-500 text-orange-400 hover:bg-orange-500/10"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Features List */}
                <div className="px-4 py-3 flex-1 overflow-y-auto min-h-0">
                  <ul className="space-y-1.5">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        <Check
                          size={14}
                          className="text-orange-400 shrink-0 mt-0.5"
                        />
                        <span className="text-gray-300 line-clamp-2">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className="px-4 py-2 text-center text-xs text-gray-500 border-t border-slate-700 shrink-0">
                  {plan.price === 0 ? "Forever free" : "Billed " + billingCycle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/30 border-y border-slate-700">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            ✓ Included in Every Plan
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-orange-500/50 transition-all">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Check className="text-orange-400" size={20} />
                Security
              </h4>
              <ul className="space-y-2">
                {[
                  "Enterprise encryption",
                  "GDPR compliant",
                  "Regular audits",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-gray-300 text-sm"
                  >
                    <Check size={14} className="text-orange-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-orange-500/50 transition-all">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="text-orange-400" size={20} />
                Performance
              </h4>
              <ul className="space-y-2">
                {["99.9% uptime", "Global CDN", "Lightning speed"].map(
                  (item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-gray-300 text-sm"
                    >
                      <Check size={14} className="text-orange-400" />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-orange-500/50 transition-all">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="text-orange-400" size={20} />
                Support
              </h4>
              <ul className="space-y-2">
                {["24/7 support", "Knowledge base", "Community forum"].map(
                  (item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-gray-300 text-sm"
                    >
                      <Check size={14} className="text-orange-400" />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Full Plan Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-white font-bold text-sm sticky left-0 bg-slate-900">
                    Feature
                  </th>
                  {pricePlans.map((plan, idx) => (
                    <th
                      key={idx}
                      className="text-center py-3 px-3 text-white font-bold text-sm"
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-slate-700 hover:bg-slate-800/30"
                  >
                    <td className="py-3 px-4 text-white font-medium text-sm sticky left-0 bg-slate-900">
                      {row.feature}
                    </td>
                    {row.plans.map((item, i) => (
                      <td key={i} className="text-center py-3 px-3">
                        {typeof item === "boolean" ? (
                          item ? (
                            <Check
                              size={18}
                              className="text-orange-400 mx-auto"
                            />
                          ) : (
                            <X size={18} className="text-gray-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-300 text-sm">{item}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/30 border-y border-slate-700">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-orange-500/50 transition-all"
              >
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <HelpCircle className="text-orange-400 shrink-0" size={16} />
                  {faq.q}
                </h4>
                <p className="text-gray-400 text-xs">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-700">
        <div className="max-w-4xl mx-auto text-center bg-linear-to-r from-orange-500/10 to-blue-500/10 border border-orange-500/30 rounded-xl p-10 hover:border-orange-500/50 transition-all">
          <h2 className="text-3xl font-bold text-white mb-3">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 mb-6">
            Join thousands using SwiftShare for secure file sharing
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-8 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20 inline-flex items-center justify-center gap-2">
              Start Free Trial <ArrowRight size={18} />
            </button>
            <button className="px-8 py-3 border-2 border-orange-500 text-orange-400 rounded-lg font-semibold hover:bg-orange-500/10 transition-all">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
