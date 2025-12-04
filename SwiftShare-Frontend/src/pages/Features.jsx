import { features } from "../assets/data.js";
import {
  ArrowUpCircle,
  Shield,
  Share2,
  CreditCard,
  FileText,
  Clock,
  Check,
  Zap,
  Lock,
  Eye,
  Share,
  BarChart3,
  Smartphone,
  Cpu,
  Users,
  GitBranch,
} from "lucide-react";
import { useState } from "react";

const Features = () => {
  const [activeTab, setActiveTab] = useState(0);

  const detailedFeatures = [
    {
      title: "Lightning-Fast Uploads",
      description:
        "Experience blazing-fast file transfers with our next-gen upload engine. Drag, drop, and deploy in seconds.",
      icon: ArrowUpCircle,
      color: "from-cyan-400 to-blue-500",
      details: [
        "P2P acceleration",
        "Parallel uploads",
        "Smart compression",
        "Resume capability",
      ],
      performance: "10x faster than competitors",
    },
    {
      title: "Military-Grade Security",
      description:
        "End-to-end AES-256 encryption ensures your data remains impenetrable. Your files, your fortress.",
      icon: Shield,
      color: "from-emerald-400 to-green-500",
      details: [
        "256-bit encryption",
        "Zero-knowledge proof",
        "GDPR compliant",
        "SOC 2 certified",
      ],
      performance: "Bank-level security",
    },
    {
      title: "Smart Sharing",
      description:
        "Generate secure, time-limited links with granular access controls. Share smarter, not harder.",
      icon: Share2,
      color: "from-blue-400 to-indigo-500",
      details: [
        "Time-limited links",
        "Password protection",
        "Download limits",
        "Expiry options",
      ],
      performance: "Full control over access",
    },
    {
      title: "Dynamic Credits",
      description:
        "Scale seamlessly with our intelligent credit system. Pay precisely for your storage footprint.",
      icon: CreditCard,
      color: "from-orange-400 to-red-500",
      details: [
        "Pay-as-you-go",
        "No overage fees",
        "Rollover credits",
        "Team pooling",
      ],
      performance: "Flexible pricing",
    },
    {
      title: "Unified Dashboard",
      description:
        "Command your entire file ecosystem from one powerful interface. Organize, preview, and distribute effortlessly.",
      icon: FileText,
      color: "from-rose-400 to-pink-500",
      details: [
        "Drag-and-drop",
        "Bulk operations",
        "File preview",
        "Search & filter",
      ],
      performance: "Full control at a glance",
    },
    {
      title: "Real-Time Analytics",
      description:
        "Track every transaction, monitor usage patterns, and optimize your workflow with live insights.",
      icon: Clock,
      color: "from-violet-400 to-purple-500",
      details: [
        "Download tracking",
        "Usage reports",
        "Team analytics",
        "Export data",
      ],
      performance: "Data-driven decisions",
    },
  ];

  const additionalFeatures = [
    {
      icon: Lock,
      title: "Advanced Permissions",
      desc: "Granular control over who can view, download, or share files",
      category: "Security",
    },
    {
      icon: Eye,
      title: "File Preview",
      desc: "View documents, images, and videos without downloading",
      category: "Convenience",
    },
    {
      icon: Share,
      title: "Team Collaboration",
      desc: "Work together seamlessly with built-in commenting and versioning",
      category: "Collaboration",
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      desc: "Get insights into file usage, user behavior, and storage trends",
      category: "Insights",
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      desc: "Full access to SwiftShare on iOS and Android devices",
      category: "Accessibility",
    },
    {
      icon: GitBranch,
      title: "Version Control",
      desc: "Keep track of file versions and easily restore previous versions",
      category: "Management",
    },
  ];

  const integrations = [
    {
      name: "Google Workspace",
      desc: "Seamless integration with Google Drive, Docs, and Sheets",
    },
    {
      name: "Microsoft 365",
      desc: "Direct integration with OneDrive, Teams, and Outlook",
    },
    {
      name: "Slack",
      desc: "Share files directly from SwiftShare to Slack channels",
    },
    {
      name: "Zapier",
      desc: "Connect with 5000+ apps through our Zapier integration",
    },
    {
      name: "Webhooks",
      desc: "Build custom integrations with our powerful webhook API",
    },
    { name: "REST API", desc: "Complete REST API for custom development" },
  ];

  const useCases = [
    {
      title: "Creative Agencies",
      desc: "Share large design files, videos, and assets securely with clients",
      icon: "🎨",
    },
    {
      title: "Legal Firms",
      desc: "HIPAA and compliance-ready file sharing for sensitive documents",
      icon: "⚖️",
    },
    {
      title: "Healthcare",
      desc: "Patient records and medical imaging with enterprise security",
      icon: "🏥",
    },
    {
      title: "Tech Teams",
      desc: "Code repositories, builds, and deployment files",
      icon: "💻",
    },
    {
      title: "Education",
      desc: "Course materials, assignments, and research data sharing",
      icon: "📚",
    },
    {
      title: "Finance",
      desc: "Secure exchange of financial documents and reports",
      icon: "💰",
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-8">
            <Zap size={16} className="text-orange-400" />
            <span className="text-orange-400 font-medium text-sm">
              Powerful Capabilities
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Everything You Need{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">
              For File Sharing
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Built with cutting-edge technology and user experience at its core.
            SwiftShare combines power, simplicity, and security into one
            revolutionary platform.
          </p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {detailedFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-orange-500/50 transition-all hover:shadow-lg hover:shadow-orange-500/10"
                >
                  <div
                    className={`bg-linear-to-br ${feature.color} p-0.5 rounded-lg w-12 h-12 mb-6`}
                  >
                    <div className="bg-slate-900 rounded-lg w-full h-full flex items-center justify-center">
                      <Icon className="text-orange-400" size={24} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 mb-6 text-sm">
                    {feature.description}
                  </p>

                  <div className="mb-6 pt-6 border-t border-slate-700">
                    <p className="text-orange-400 font-semibold text-sm mb-4">
                      {feature.performance}
                    </p>
                    <ul className="space-y-3">
                      {feature.details.map((detail, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-gray-300 text-sm"
                        >
                          <Check
                            size={16}
                            className="text-orange-400 shrink-0"
                          />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30 border-y border-slate-700">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            More Amazing Features
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {additionalFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-orange-500/50 transition-all flex gap-6 group"
                >
                  <div className="shrink-0">
                    <div className="bg-orange-500/20 p-3 rounded-lg group-hover:bg-orange-500/30 transition-all">
                      <Icon className="text-orange-400" size={24} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-lg font-bold text-white">
                        {feature.title}
                      </h4>
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">
                        {feature.category}
                      </span>
                    </div>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Built For Every Industry
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-orange-500/50 transition-all hover:shadow-lg hover:shadow-orange-500/10"
              >
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h4 className="text-xl font-bold text-white mb-3">
                  {useCase.title}
                </h4>
                <p className="text-gray-400">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30 border-y border-slate-700">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Seamless Integrations
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Connect SwiftShare with your favorite tools and platforms
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {integrations.map((integration, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-orange-500/50 transition-all text-center group"
              >
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/30 transition-all">
                  <Cpu className="text-orange-400" size={24} />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  {integration.name}
                </h4>
                <p className="text-gray-400 text-sm">{integration.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Why Choose SwiftShare?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-linear-to-br from-orange-500/10 to-transparent border border-orange-500/30 rounded-xl p-8">
              <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Shield className="text-orange-400" size={24} />
                Security
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check
                    size={20}
                    className="text-orange-400 shrink-0 mt-0.5"
                  />
                  <span className="text-gray-300">Enterprise encryption</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check
                    size={20}
                    className="text-orange-400 shrink-0 mt-0.5"
                  />
                  <span className="text-gray-300">GDPR & compliance</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check
                    size={20}
                    className="text-orange-400 shrink-0 mt-0.5"
                  />
                  <span className="text-gray-300">Regular audits</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check
                    size={20}
                    className="text-orange-400 shrink-0 mt-0.5"
                  />
                  <span className="text-gray-300">Zero-knowledge proof</span>
                </li>
              </ul>
            </div>

            <div className="bg-linear-to-br from-blue-500/10 to-transparent border border-blue-500/30 rounded-xl p-8">
              <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap className="text-blue-400" size={24} />
                Performance
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check
                    size={20}
                    className="text-blue-400 shrink-0 mt-0.5"
                  />
                  <span className="text-gray-300">Lightning-fast uploads</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check
                    size={20}
                    className="text-blue-400 shrink-0 mt-0.5"
                  />
                  <span className="text-gray-300">99.9% uptime</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check
                    size={20}
                    className="text-blue-400 shrink-0 mt-0.5"
                  />
                  <span className="text-gray-300">Global CDN</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check
                    size={20}
                    className="text-blue-400 shrink-0 mt-0.5"
                  />
                  <span className="text-gray-300">Unlimited bandwidth</span>
                </li>
              </ul>
            </div>

            <div className="bg-linear-to-br from-emerald-500/10 to-transparent border border-emerald-500/30 rounded-xl p-8">
              <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Users className="text-emerald-400" size={24} />
                Support
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check
                    size={20}
                    className="text-emerald-400 shrink-0 mt-0.5"
                  />
                  <span className="text-gray-300">24/7 support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check
                    size={20}
                    className="text-emerald-400 shrink-0 mt-0.5"
                  />
                  <span className="text-gray-300">API documentation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check
                    size={20}
                    className="text-emerald-400 shrink-0 mt-0.5"
                  />
                  <span className="text-gray-300">Active community</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check
                    size={20}
                    className="text-emerald-400 shrink-0 mt-0.5"
                  />
                  <span className="text-gray-300">Dedicated support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-700">
        <div className="max-w-4xl mx-auto text-center bg-linear-to-r from-orange-500/10 to-blue-500/10 border border-orange-500/30 rounded-2xl p-12 hover:border-orange-500/50 transition-all">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Experience Excellence?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Start sharing files securely with SwiftShare today
          </p>
          <button className="px-8 py-4 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20">
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default Features;
