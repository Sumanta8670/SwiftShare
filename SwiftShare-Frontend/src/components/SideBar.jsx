import { useUser, useClerk } from "@clerk/clerk-react";
import {
  User,
  LogOut,
  Menu,
  X,
  Home,
  FileText,
  Zap,
  History,
  HelpCircle,
  Settings,
} from "lucide-react";
import { SIDE_MENU_DATA } from "../assets/data.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SideBar = ({ activeMenu }) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const sidebarItems = SIDE_MENU_DATA || [];

  const additionalLinks = [
    {
      label: "About",
      path: "/about",
      icon: HelpCircle,
    },
    {
      label: "Pricing",
      path: "/pricing",
      icon: Zap,
    },
    {
      label: "Features",
      path: "/features",
      icon: Settings,
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden max-[1080px]:hidden w-64 h-[calc(100vh-61px)] bg-linear-to-b from-slate-800 to-slate-900 border-r border-slate-700 p-5 sticky top-[61px] z-20 flex-col overflow-y-auto">
        {/* User Profile Section */}
        <div className="flex flex-col items-center justify-center gap-3 mt-2 mb-8 pb-6 border-b border-slate-700 cursor-pointer hover:opacity-80 transition-opacity group">
          <div className="relative">
            {user?.imageUrl ? (
              <img
                src={user?.imageUrl || ""}
                alt="Profile Image"
                className="w-20 h-20 bg-linear-to-br from-orange-400 to-purple-500 rounded-full object-cover border-2 border-orange-500/50 shadow-lg shadow-orange-500/20 group-hover:border-orange-400 transition-colors"
              />
            ) : (
              <div className="w-20 h-20 bg-linear-to-br from-orange-400 to-purple-500 rounded-full flex items-center justify-center border-2 border-orange-500/50 shadow-lg group-hover:border-orange-400 transition-colors">
                <User className="w-10 h-10 text-white" />
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800 shadow-lg"></div>
          </div>
          <h5 className="text-gray-100 font-bold text-center leading-6 group-hover:text-orange-400 transition-colors">
            {user?.fullName || "User"}
          </h5>
          <p className="text-xs text-gray-500 text-center truncate max-w-[90%]">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Dashboard Menu */}
          <div className="mb-6">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 px-2">
              Dashboard
            </p>
            {sidebarItems.map((item, index) => (
              <button
                key={`menu_${index}`}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-4 text-sm py-3 px-4 rounded-lg mb-2 transition-all duration-200 cursor-pointer font-medium ${
                  activeMenu === item.label
                    ? "bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 border border-orange-400/50"
                    : "text-gray-300 hover:bg-slate-700/50 hover:text-white hover:border border border-transparent hover:border-slate-600"
                }`}
              >
                <item.icon className="text-lg shrink-0" />
                <span>{item.label}</span>
                {activeMenu === item.label && (
                  <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-slate-700"></div>

          {/* Additional Links */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 px-2">
              More
            </p>
            {additionalLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <button
                  key={`link_${index}`}
                  onClick={() => handleNavigation(link.path)}
                  className={`w-full flex items-center gap-4 text-sm py-3 px-4 rounded-lg mb-2 transition-all duration-200 cursor-pointer font-medium ${
                    activeMenu === link.label
                      ? "bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 border border-orange-400/50"
                      : "text-gray-300 hover:bg-slate-700/50 hover:text-white hover:border border border-transparent hover:border-slate-600"
                  }`}
                >
                  <Icon className="text-lg shrink-0" />
                  <span>{link.label}</span>
                  {activeMenu === link.label && (
                    <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Logout Section */}
        <div className="pt-6 border-t border-slate-700 mt-4">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center gap-4 text-sm py-3 px-4 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 font-medium border border-transparent hover:border-red-500/30"
          >
            <LogOut className="text-lg shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="max-[1080px]:flex hidden items-center gap-2 px-4">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-slate-700/50 rounded-lg transition-all text-gray-400 hover:text-orange-400"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 max-[1080px]:flex hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Mobile Menu */}
          <div className="absolute left-0 top-[61px] w-72 h-[calc(100vh-61px)] bg-linear-to-b from-slate-800 to-slate-900 border-r border-slate-700 flex flex-col overflow-y-auto z-50 shadow-2xl">
            {/* User Profile Section */}
            <div className="flex flex-col items-center justify-center gap-3 p-6 border-b border-slate-700">
              <div className="relative">
                {user?.imageUrl ? (
                  <img
                    src={user?.imageUrl || ""}
                    alt="Profile Image"
                    className="w-16 h-16 bg-linear-to-br from-orange-400 to-purple-500 rounded-full object-cover border-2 border-orange-500/50 shadow-lg shadow-orange-500/20"
                  />
                ) : (
                  <div className="w-16 h-16 bg-linear-to-br from-orange-400 to-purple-500 rounded-full flex items-center justify-center border-2 border-orange-500/50 shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                )}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-800"></div>
              </div>
              <h5 className="text-gray-100 font-bold text-center text-sm leading-5">
                {user?.fullName || "User"}
              </h5>
              <p className="text-xs text-gray-500 text-center truncate max-w-[90%]">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Main Dashboard Menu */}
              <div className="mb-6">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Dashboard
                </p>
                {sidebarItems.map((item, index) => (
                  <button
                    key={`mobile_menu_${index}`}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center gap-4 text-sm py-3 px-4 rounded-lg mb-2 transition-all duration-200 cursor-pointer font-medium ${
                      activeMenu === item.label
                        ? "bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 border border-orange-400/50"
                        : "text-gray-300 hover:bg-slate-700/50 hover:text-white border border-transparent hover:border-slate-600"
                    }`}
                  >
                    <item.icon className="text-lg shrink-0" />
                    <span>{item.label}</span>
                    {activeMenu === item.label && (
                      <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="my-4 border-t border-slate-700"></div>

              {/* Additional Links */}
              <div className="mb-6">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                  More
                </p>
                {additionalLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={`mobile_link_${index}`}
                      onClick={() => handleNavigation(link.path)}
                      className={`w-full flex items-center gap-4 text-sm py-3 px-4 rounded-lg mb-2 transition-all duration-200 cursor-pointer font-medium ${
                        activeMenu === link.label
                          ? "bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 border border-orange-400/50"
                          : "text-gray-300 hover:bg-slate-700/50 hover:text-white border border-transparent hover:border-slate-600"
                      }`}
                    >
                      <Icon className="text-lg shrink-0" />
                      <span>{link.label}</span>
                      {activeMenu === link.label && (
                        <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Logout Section */}
            <div className="p-4 border-t border-slate-700">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowLogoutConfirm(true);
                }}
                className="w-full flex items-center gap-4 text-sm py-3 px-4 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 font-medium border border-transparent hover:border-red-500/30"
              >
                <LogOut className="text-lg shrink-0" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowLogoutConfirm(false)}
          />
          <div className="relative bg-linear-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl border border-slate-700 p-8 max-w-sm mx-4">
            <h3 className="text-2xl font-bold text-white mb-2">Sign Out?</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to sign out from your account? You'll need
              to sign in again to access SwiftShare.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-300 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition-all shadow-lg shadow-red-500/20"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
