import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Share2,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-linear-to-b from-slate-900 to-slate-950 border-t border-orange-500/30 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-linear-to-br from-orange-400 to-orange-600 p-2 rounded-lg">
                <Share2 className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">
                SwiftShare
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Secure file sharing made simple. Share, manage, and collaborate on
              your files with enterprise-grade security.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-orange-400 transition-colors p-2 hover:bg-slate-800 rounded-lg"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-400 transition-colors p-2 hover:bg-slate-800 rounded-lg"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-400 transition-colors p-2 hover:bg-slate-800 rounded-lg"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-400 transition-colors p-2 hover:bg-slate-800 rounded-lg"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Features
                  </span>
                  <ExternalLink
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Pricing
                  </span>
                  <ExternalLink
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Security
                  </span>
                  <ExternalLink
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Roadmap
                  </span>
                  <ExternalLink
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    About Us
                  </span>
                  <ExternalLink
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Blog
                  </span>
                  <ExternalLink
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Careers
                  </span>
                  <ExternalLink
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Contact
                  </span>
                  <ExternalLink
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
              Get in Touch
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:support@swiftshare.com"
                className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors group"
              >
                <div className="bg-slate-800 group-hover:bg-orange-500/20 p-2 rounded-lg transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-xs text-gray-500">
                    support@swiftshare.com
                  </p>
                </div>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors group"
              >
                <div className="bg-slate-800 group-hover:bg-orange-500/20 p-2 rounded-lg transition-colors">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-xs text-gray-500">+1 (234) 567-890</p>
                </div>
              </a>
              <div className="flex items-center gap-3 text-gray-400 group">
                <div className="bg-slate-800 group-hover:bg-orange-500/20 p-2 rounded-lg transition-colors">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-xs text-gray-500">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-12"></div>

        {/* Bottom Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="text-sm text-gray-400">
            <p>&copy; 2025 SwiftShare. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-6 md:justify-end text-sm">
            <a
              href="#"
              className="text-gray-400 hover:text-orange-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-orange-400 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-orange-400 transition-colors"
            >
              Cookie Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-orange-400 transition-colors"
            >
              Sitemap
            </a>
          </div>
        </div>

        {/* Stats/CTA Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center hover:border-orange-500/50 transition-colors">
            <p className="text-2xl font-bold text-orange-400">10M+</p>
            <p className="text-xs text-gray-400 mt-1">Files Shared</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center hover:border-orange-500/50 transition-colors">
            <p className="text-2xl font-bold text-orange-400">500K+</p>
            <p className="text-xs text-gray-400 mt-1">Active Users</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center hover:border-orange-500/50 transition-colors">
            <p className="text-2xl font-bold text-orange-400">99.9%</p>
            <p className="text-xs text-gray-400 mt-1">Uptime</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center hover:border-orange-500/50 transition-colors">
            <p className="text-2xl font-bold text-orange-400">256-bit</p>
            <p className="text-xs text-gray-400 mt-1">Encryption</p>
          </div>
        </div>
      </div>

      {/* Gradient Border Top */}
      <div className="h-1 bg-linear-to-r from-transparent via-orange-500 to-transparent opacity-30"></div>
    </footer>
  );
};

export default Footer;
