import {
  ArrowUpCircle,
  Clock,
  CreditCard,
  FileText,
  Share2,
  Shield,
  CheckCircle,
  Zap,
} from "lucide-react";
import { useState } from "react";

const FeaturesSection = ({ features }) => {
  const [hoveredFeature, setHoveredFeature] = useState(0);

  const renderIcon = (iconName, iconColor) => {
    const iconProps = { size: 32, className: iconColor };
    switch (iconName) {
      case "ArrowUpCircle":
        return <ArrowUpCircle {...iconProps} />;
      case "Shield":
        return <Shield {...iconProps} />;
      case "Share2":
        return <Share2 {...iconProps} />;
      case "CreditCard":
        return <CreditCard {...iconProps} />;
      case "FileText":
        return <FileText {...iconProps} />;
      case "Clock":
        return <Clock {...iconProps} />;
      default:
        return <FileText {...iconProps} />;
    }
  };

  const benefits = [
    {
      number: "01",
      title: "Faster Collaboration",
      desc: "Teams complete projects 3x faster with instant file sharing",
    },
    {
      number: "02",
      title: "Enhanced Security",
      desc: "Sleep soundly knowing your data is protected 24/7",
    },
    {
      number: "03",
      title: "Cost Savings",
      desc: "Reduce infrastructure costs by up to 40%",
    },
    {
      number: "04",
      title: "Global Compliance",
      desc: "Meet regulations in any jurisdiction with ease",
    },
  ];

  return (
    <div className="w-full overflow-hidden relative py-20 bg-linear-to-b from-slate-800/50 to-slate-900 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-8">
            <Zap size={16} className="text-orange-400" />
            <span className="text-orange-400 font-medium text-sm">
              Core Features
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Everything You Need for{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">
              File Sharing
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed">
            Built with cutting-edge technology and user experience at its core.
            SwiftShare combines power, simplicity, and security into one
            revolutionary platform.
          </p>
        </div>

        {/* Main Features Grid with Interactive Hover */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredFeature(idx)}
              onMouseLeave={() => setHoveredFeature(null)}
              className="group relative"
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-linear-to-br from-orange-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500 ${
                  hoveredFeature === idx ? "opacity-100" : ""
                }`}
              ></div>

              <div
                className={`relative bg-slate-800/50 border rounded-2xl p-8 transition-all duration-500 ${
                  hoveredFeature === idx
                    ? "border-orange-500 shadow-2xl shadow-orange-500/20 translate-y-0"
                    : "border-slate-700 hover:border-orange-500/50"
                }`}
              >
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center p-4 rounded-xl mb-6 transition-all duration-500 ${
                    hoveredFeature === idx
                      ? "bg-linear-to-br from-orange-500/30 to-blue-500/30 scale-110"
                      : "bg-slate-700/50 group-hover:bg-orange-500/20"
                  }`}
                >
                  {renderIcon(feature.iconName, "text-orange-400")}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Features List */}
                <div className="space-y-3 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 max-h-0 group-hover:max-h-96 overflow-hidden">
                  {[
                    "Advanced capability",
                    "Real-time sync",
                    "Zero configuration",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <CheckCircle
                        size={16}
                        className="text-orange-400 shrink-0"
                      />
                      {item}
                    </div>
                  ))}
                </div>

                {/* Learn More Link */}
                <div className="flex items-center gap-2 text-orange-400 font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500">
                  Learn more →
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-linear-to-r from-orange-500/10 to-blue-500/10 border border-orange-500/30 rounded-2xl p-12 mb-20">
          <h3 className="text-3xl font-bold text-white text-center mb-16">
            Why SwiftShare Stands Out
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="group text-center hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-linear-to-br from-orange-500/30 to-blue-500/30 rounded-full mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold text-orange-400">
                    {benefit.number}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">
                  {benefit.title}
                </h4>
                <p className="text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            SwiftShare vs The Competition
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full min-w-max text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-6 text-white font-semibold">
                    Feature
                  </th>
                  <th className="text-center py-4 px-6 text-white font-semibold">
                    SwiftShare
                  </th>
                  <th className="text-center py-4 px-6 text-gray-400 font-semibold">
                    Competitor A
                  </th>
                  <th className="text-center py-4 px-6 text-gray-400 font-semibold">
                    Competitor B
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Upload Speed",
                    swift: "10x Faster",
                    comp1: "Standard",
                    comp2: "Slow",
                  },
                  {
                    feature: "Encryption",
                    swift: "256-bit AES",
                    comp1: "128-bit",
                    comp2: "No E2E",
                  },
                  {
                    feature: "Uptime SLA",
                    swift: "99.9%",
                    comp1: "99%",
                    comp2: "95%",
                  },
                  {
                    feature: "Support",
                    swift: "24/7 Premium",
                    comp1: "Email Only",
                    comp2: "Forum",
                  },
                  {
                    feature: "Pricing",
                    swift: "Best Value",
                    comp1: "Expensive",
                    comp2: "Very Expensive",
                  },
                ].map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-slate-700 hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-4 px-6 text-white font-medium">
                      {row.feature}
                    </td>
                    <td className="text-center py-4 px-6">
                      <span className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs font-semibold">
                        <CheckCircle size={14} />
                        {row.swift}
                      </span>
                    </td>
                    <td className="text-center py-4 px-6 text-gray-400">
                      {row.comp1}
                    </td>
                    <td className="text-center py-4 px-6 text-gray-400">
                      {row.comp2}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-orange-500/50 transition-all group">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-lg font-bold text-white mb-3">
              Performance Optimized
            </h4>
            <p className="text-gray-400 mb-4">
              Our advanced algorithms ensure fastest possible file transfers
              without compromising quality.
            </p>
            <a
              href="#"
              className="text-orange-400 font-semibold hover:text-orange-300 transition-colors group-hover:translate-x-1 inline-block"
            >
              Explore →
            </a>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-orange-500/50 transition-all group">
            <div className="text-4xl mb-4">🔐</div>
            <h4 className="text-lg font-bold text-white mb-3">
              Military-Grade Security
            </h4>
            <p className="text-gray-400 mb-4">
              Bank-level encryption protects your data with redundancy across
              multiple secure data centers.
            </p>
            <a
              href="#"
              className="text-orange-400 font-semibold hover:text-orange-300 transition-colors group-hover:translate-x-1 inline-block"
            >
              Learn more →
            </a>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-orange-500/50 transition-all group">
            <div className="text-4xl mb-4">🌍</div>
            <h4 className="text-lg font-bold text-white mb-3">
              Global Infrastructure
            </h4>
            <p className="text-gray-400 mb-4">
              Distributed across 50+ countries with local compliance and support
              in your timezone.
            </p>
            <a
              href="#"
              className="text-orange-400 font-semibold hover:text-orange-300 transition-colors group-hover:translate-x-1 inline-block"
            >
              Discover →
            </a>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 -right-32 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 -left-32 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
    </div>
  );
};

export default FeaturesSection;
