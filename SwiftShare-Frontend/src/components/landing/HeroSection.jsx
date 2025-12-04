import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import dashboardImage from "../../assets/image.png"; // Import dashboard image

const HeroSection = ({ openSignIn, openSignUp }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Military-Grade Security",
      desc: "AES-256 encryption protects your files",
    },
    { icon: Zap, title: "Lightning Fast", desc: "10x faster than competitors" },
    { icon: Globe, title: "Global Reach", desc: "Available in 50+ countries" },
  ];

  const stats = [
    { value: "500K+", label: "Active Users" },
    { value: "10M+", label: "Files Shared" },
    { value: "99.9%", label: "Uptime" },
  ];

  return (
    <div className="w-full overflow-hidden bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div
          className="absolute w-96 h-96 bg-linear-to-r from-orange-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none"
          style={{
            left: mousePosition.x - 200,
            top: mousePosition.y - 200,
            transition: "all 0.3s ease-out",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 hover:border-orange-500/50 transition-all cursor-pointer group">
              <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:scale-150 transition-transform"></div>
              <span className="text-orange-400 font-medium text-sm">
                🚀 Trusted by leading companies worldwide
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              <span className="block">Share Files</span>
              <span className="block">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-orange-300 to-orange-600 animate-pulse">
                  Securely & Instantly
                </span>
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Experience the future of file sharing. Enterprise-grade security
              meets intuitive design. Upload, manage, and collaborate with
              confidence.
            </p>

            {/* CTA Buttons */}
            <div className="mt-12 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center gap-4">
              <button
                onClick={() => openSignUp()}
                className="group flex items-center justify-center px-8 py-4 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/50 hover:shadow-orange-500/70 hover:scale-105 w-full sm:w-auto"
              >
                Get Started Free
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
              <button
                onClick={() => openSignIn()}
                className="flex items-center justify-center px-8 py-4 border-2 border-blue-400 text-blue-300 rounded-lg font-semibold hover:bg-blue-400/10 transition-all hover:scale-105 w-full sm:w-auto"
              >
                Sign In
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center group cursor-pointer">
                  <p className="text-3xl sm:text-4xl font-bold text-orange-400 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </p>
                  <p className="text-sm sm:text-base text-gray-400 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Cards Carousel */}
          <div className="mt-20">
            <h3 className="text-center text-gray-400 text-sm font-semibold mb-8 uppercase tracking-wider">
              Why Choose SwiftShare?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveFeature(idx)}
                    className={`p-6 rounded-xl transition-all cursor-pointer transform hover:scale-105 ${
                      activeFeature === idx
                        ? "bg-linear-to-br from-orange-500/20 to-blue-500/20 border-2 border-orange-500 shadow-lg shadow-orange-500/20"
                        : "bg-slate-800/50 border border-slate-700 hover:border-orange-500/50"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                        activeFeature === idx
                          ? "bg-orange-500/30"
                          : "bg-slate-700/50"
                      }`}
                    >
                      <Icon className="text-orange-400" size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dashboard Preview with Image */}
          <div className="relative mt-20 pb-12 group">
            <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl shadow-orange-500/20 bg-linear-to-br from-slate-800 to-slate-900 hover:shadow-orange-500/30 hover:border-orange-500/50 transition-all duration-300">
              {/* Top Bar */}
              <div className="bg-slate-900/50 border-b border-slate-700 px-6 py-4 flex items-center justify-between backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <p className="text-sm text-gray-400">SwiftShare Dashboard</p>
                <div className="w-12"></div>
              </div>

              {/* Dashboard Image Container */}
              <div className="relative overflow-hidden bg-linear-to-b from-slate-800 to-slate-900">
                {/* Image */}
                <img
                  src={dashboardImage}
                  alt="SwiftShare Dashboard"
                  className="w-full h-auto object-contain p-6 md:p-8 lg:p-12"
                />

                {/* Gradient Overlay for loading effect */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent opacity-20 pointer-events-none"></div>

                {/* Optional: Floating action button overlay */}
                <div className="absolute bottom-8 right-8 bg-linear-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-orange-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:from-orange-600 hover:to-orange-700 transform hover:scale-105">
                  Explore Dashboard →
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-12 -left-12 bg-slate-800/80 border border-slate-700 rounded-xl p-4 backdrop-blur-md hidden lg:block hover:scale-105 transition-transform shadow-xl">
              <p className="text-sm text-gray-300 font-semibold">
                ✨ Lightning Fast
              </p>
              <p className="text-xs text-gray-500 mt-1">10x faster uploads</p>
            </div>
            <div className="absolute -bottom-12 -right-12 bg-slate-800/80 border border-slate-700 rounded-xl p-4 backdrop-blur-md hidden lg:block hover:scale-105 transition-transform shadow-xl">
              <p className="text-sm text-gray-300 font-semibold">
                🔐 Bank-Level Security
              </p>
              <p className="text-xs text-gray-500 mt-1">256-bit encryption</p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20 pt-20 border-t border-slate-700">
            <p className="text-gray-400 mb-6">
              ✓ 14-day free trial • ✓ No credit card required • ✓ Cancel anytime
            </p>
            <h3 className="text-2xl font-bold text-white mb-8">
              Start sharing files securely in{" "}
              <span className="text-orange-400">30 seconds</span>
            </h3>
            <button
              onClick={() => openSignUp()}
              className="px-8 py-4 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 inline-flex items-center gap-2"
            >
              Create Free Account <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
