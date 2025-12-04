import { Check, TrendingUp, Zap, ArrowRight } from "lucide-react";
import { useState } from "react";

const PricingSection = ({ pricePlans, openSignUp }) => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [hoveredPlan, setHoveredPlan] = useState(1);

  const savings = [
    { plan: "Plus", monthly: 999, annual: 9990, save: "₹2,400" },
    { plan: "Pro", monthly: 2499, annual: 24990, save: "₹5,990" },
    { plan: "Business", monthly: 4999, annual: 49990, save: "₹11,990" },
  ];

  return (
    <div className="w-full overflow-hidden py-20 bg-linear-to-b from-slate-900 to-slate-800 border-t border-slate-700 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-8">
            <Zap size={16} className="text-orange-400" />
            <span className="text-orange-400 font-medium text-sm">
              Transparent Pricing
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Plans for Every{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">
              Team Size
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
            Start free, scale as you grow. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-6 mb-8">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                billingCycle === "monthly"
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all relative ${
                billingCycle === "annual"
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Annual
              {billingCycle === "annual" && (
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  Save 20% 🎉
                </span>
              )}
            </button>
          </div>

          <p className="text-gray-400 text-sm">
            ✨ 14-day free trial for all plans • No credit card needed
          </p>
        </div>

        {/* Pricing Cards - Optimized Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
          {pricePlans.map((plan, idx) => {
            const isHovered = hoveredPlan === idx;
            const featuresToShow = plan.highlighted
              ? plan.features.slice(0, 5)
              : plan.features.slice(0, 4);
            const remainingFeatures = plan.highlighted
              ? plan.features.length - 5
              : plan.features.length - 4;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredPlan(idx)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`rounded-xl transition-all duration-500 flex flex-col relative group overflow-hidden ${
                  plan.highlighted
                    ? "bg-linear-to-br from-orange-500/20 to-blue-500/20 border-2 border-orange-500 shadow-2xl shadow-orange-500/30 md:col-span-1 lg:scale-105 lg:-translate-y-2"
                    : "bg-slate-800/50 border border-slate-700 hover:border-orange-500/50"
                }`}
              >
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 bg-linear-to-br from-orange-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 ${
                    isHovered ? "opacity-100" : ""
                  }`}
                ></div>

                {/* Popular Badge */}
                {plan.highlighted && (
                  <div className="px-4 pt-4 pb-0 relative z-10">
                    <div className="inline-block bg-linear-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse items-center gap-1">
                      <TrendingUp size={12} />
                      POPULAR
                    </div>
                  </div>
                )}

                {/* Content Container - Fixed Height */}
                <div className="flex-1 p-4 md:p-5 flex flex-col relative z-10 min-h-[520px] md:min-h-[480px]">
                  {/* Plan Name */}
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm mb-3 line-clamp-2">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-3">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl md:text-4xl font-bold text-white">
                        {typeof plan.price === "number"
                          ? "₹" +
                            (billingCycle === "annual"
                              ? Math.round(plan.price * 12 * 0.8)
                              : plan.price
                            ).toLocaleString()
                          : plan.price}
                      </span>
                      {plan.price !== 0 && plan.price !== "Custom" && (
                        <span className="text-gray-400 text-xs md:text-sm">
                          /{billingCycle === "annual" ? "year" : "month"}
                        </span>
                      )}
                    </div>
                    {billingCycle === "annual" &&
                      typeof plan.price === "number" &&
                      plan.price !== 0 && (
                        <p className="text-green-400 text-xs md:text-sm mt-1 font-semibold leading-tight">
                          ✓ Save ₹
                          {Math.round(plan.price * 12 * 0.2).toLocaleString()}
                          /year
                        </p>
                      )}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => openSignUp()}
                    className={`w-full py-2 px-3 rounded-lg font-semibold transition-all mb-3 flex items-center justify-center gap-1 text-sm transform hover:scale-105 active:scale-95 shrink-0 ${
                      plan.highlighted
                        ? "bg-linear-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
                        : "border border-orange-500 text-orange-400 hover:bg-orange-500/10"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight
                      size={14}
                      className={
                        isHovered ? "translate-x-0.5 transition-transform" : ""
                      }
                    />
                  </button>

                  {/* Features List - Scrollable */}
                  <div className="flex-1 overflow-y-auto min-h-0 mb-2 pr-1 scrollbar-thin">
                    <div className="space-y-2">
                      {featuresToShow.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 transform transition-all duration-300 hover:translate-x-0.5 cursor-pointer"
                        >
                          <Check
                            size={14}
                            className="text-orange-400 shrink-0 mt-0.5"
                          />
                          <span className="text-gray-300 text-xs md:text-sm group-hover:text-gray-200 transition-colors line-clamp-2">
                            {feature}
                          </span>
                        </div>
                      ))}

                      {remainingFeatures > 0 && (
                        <div className="pt-2 border-t border-slate-700">
                          <p className="text-orange-400 font-semibold text-xs">
                            + {remainingFeatures} more features
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Note */}
                  <div className="text-xs text-gray-500 text-center pt-2 border-t border-slate-700 shrink-0">
                    {plan.price === 0 ? "Forever free" : "Billed monthly"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Annual Savings Highlight - Compact */}
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {savings.map((saving, idx) => (
            <div
              key={idx}
              className="bg-linear-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4 hover:border-green-500/50 transition-all group cursor-pointer hover:scale-105"
            >
              <h4 className="text-base font-bold text-white mb-1">
                {saving.plan} Plan
              </h4>
              <p className="text-gray-400 text-xs mb-2">Annual billing</p>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-lg font-bold text-white">
                  ₹{(saving.annual / 12).toLocaleString()}
                </span>
                <span className="text-green-400 font-semibold text-sm">
                  {saving.save}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                vs ₹{saving.monthly.toLocaleString()}/mo
              </p>
            </div>
          ))}
        </div>

        {/* What's Included - Compact */}
        <div className="bg-linear-to-r from-orange-500/10 to-blue-500/10 border border-orange-500/30 rounded-xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            ✓ Included in Every Plan
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Security",
                items: [
                  "256-bit encryption",
                  "GDPR compliant",
                  "Regular audits",
                ],
              },
              {
                title: "Performance",
                items: ["99.9% uptime SLA", "Global CDN", "Lightning speed"],
              },
              {
                title: "Support",
                items: ["Email support", "Knowledge base", "Community forum"],
              },
            ].map((category, idx) => (
              <div key={idx} className="text-center">
                <h4 className="text-lg font-bold text-white mb-3">
                  {category.title}
                </h4>
                <ul className="space-y-2">
                  {category.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-center gap-2 text-gray-300 text-sm"
                    >
                      <Check size={16} className="text-orange-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Preview - Compact */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Common Questions
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                q: "Can I change my plan anytime?",
                a: "Yes! Upgrade or downgrade instantly with prorated billing.",
              },
              {
                q: "Is there a free trial?",
                a: "Yes, 14 days free with all features. No credit card required.",
              },
              {
                q: "What's your refund policy?",
                a: "30-day money-back guarantee on all plans.",
              },
              {
                q: "Do you offer discounts?",
                a: "Yes, 20% off with annual billing.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-orange-500/50 transition-all group hover:scale-105"
              >
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1">
                  <span className="text-orange-400">?</span>
                  {faq.q}
                </h4>
                <p className="text-gray-400 text-xs">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA - Compact */}
        <div className="text-center bg-linear-to-r from-orange-500/10 to-blue-500/10 border border-orange-500/30 rounded-xl p-8 hover:border-orange-500/50 transition-all">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to Transform Your File Sharing?
          </h3>
          <p className="text-gray-300 text-sm md:text-base mb-6 max-w-2xl mx-auto">
            Join thousands of teams using SwiftShare for secure, lightning-fast
            collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => openSignUp()}
              className="px-6 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20 hover:scale-105 inline-flex items-center justify-center gap-2 text-sm"
            >
              Start Free Trial <ArrowRight size={16} />
            </button>
            <button className="px-6 py-3 border-2 border-orange-500 text-orange-400 rounded-lg font-semibold hover:bg-orange-500/10 transition-all hover:scale-105 text-sm">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
    </div>
  );
};

export default PricingSection;
