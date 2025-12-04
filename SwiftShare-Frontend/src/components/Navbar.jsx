import { useUser, useClerk } from "@clerk/clerk-react";
import {
  Share2,
  Menu,
  X,
  LogOut,
  Home,
  Files,
  Zap,
  History,
  Settings,
  Bell,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ activeMenu }) => {
  const { user } = useClerk();
  const { signOut, openSignIn } = useClerk();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Dashboard menu for authenticated users
  const dashboardMenuItems = [
    { label: "Dashboard", path: "/dashboard", icon: Home },
    { label: "MyFiles", path: "/my-files", icon: Files },
    { label: "Upload", path: "/upload", icon: Zap },
    { label: "Subscription", path: "/subscription", icon: Zap },
    { label: "Transactions", path: "/transactions", icon: History },
  ];

  // Public menu for unauthenticated users
  const publicMenuItems = [
    { label: "About", path: "/about" },
    { label: "Pricing", path: "/pricing" },
    { label: "Features", path: "/features" },
  ];

  const profileMenuItems = [
    {
      label: "Profile Settings",
      icon: Settings,
      action: () => navigate("/profile"),
    },
    { label: "Account", icon: Settings, action: () => navigate("/account") },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
      setProfileMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleProfileClick = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleSignIn = () => {
    openSignIn();
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  // Determine which menu to show
  const menuItems = user ? dashboardMenuItems : publicMenuItems;
  const isAuthenticated = !!user;

  return (
    <>
      <nav className="h-[61px] bg-linear-to-r from-slate-800 to-slate-900 border-b border-slate-700 flex items-center px-4 sm:px-6 sticky top-0 z-40 shadow-xl">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
          >
            <div className="bg-linear-to-br from-orange-500 to-blue-500 p-2 rounded-lg shadow-lg">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-white font-bold text-xl hidden sm:block">
              SwiftShare
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                    activeMenu === item.label
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                      : "text-gray-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  {Icon ? <Icon size={18} /> : null}
                  <span className="hidden xl:inline">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notifications - Desktop (Only for authenticated users) */}
            {isAuthenticated && (
              <button className="hidden sm:flex p-2 hover:bg-slate-700/50 rounded-lg transition-all text-gray-400 hover:text-orange-400 relative group">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
              </button>
            )}

            {/* Authenticated User - Profile Menu */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center gap-2 sm:gap-3 p-1.5 hover:bg-slate-700/50 rounded-lg transition-all"
                >
                  {/* User Info - Hidden on very small screens */}
                  <div className="hidden sm:flex flex-col items-end text-xs">
                    <p className="text-sm font-semibold text-gray-200">
                      {user?.firstName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate max-w-xs">
                      {user?.primaryEmailAddress?.emailAddress?.split("@")[0]}
                    </p>
                  </div>

                  {/* Avatar */}
                  {user?.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border-2 border-orange-500/50 shadow-lg object-cover hover:border-orange-400 transition-colors"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full border-2 border-orange-500/50 bg-linear-to-br from-orange-400 to-purple-500 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">
                        {user?.firstName?.charAt(0) || "U"}
                      </span>
                    </div>
                  )}
                </button>

                {/* Profile Dropdown Menu */}
                {profileMenuOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setProfileMenuOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute right-0 top-full mt-2 w-56 bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg shadow-2xl z-40 overflow-hidden">
                      {/* User Info in Dropdown */}
                      <div className="p-4 border-b border-slate-700 bg-slate-900/50">
                        <p className="text-sm font-bold text-white">
                          {user?.fullName || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-1">
                          {user?.primaryEmailAddress?.emailAddress}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        {profileMenuItems.map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={index}
                              onClick={() => {
                                item.action();
                                setProfileMenuOpen(false);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all"
                            >
                              <Icon size={18} />
                              <span>{item.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Divider */}
                      <div className="border-t border-slate-700"></div>

                      {/* Logout Button in Dropdown */}
                      <div className="p-2">
                        <button
                          onClick={() => {
                            setProfileMenuOpen(false);
                            setShowLogoutConfirm(true);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <LogOut size={18} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* Unauthenticated User - Sign In/Sign Up Buttons */
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={handleSignIn}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all border border-transparent hover:border-slate-600"
                >
                  Sign In
                </button>
                <button
                  onClick={handleSignUp}
                  className="px-4 py-2 text-sm font-medium text-white bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg transition-all shadow-lg shadow-orange-500/20"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-slate-700/50 rounded-lg transition-all text-gray-400 hover:text-orange-400"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[61px] left-0 right-0 bg-linear-to-b from-slate-800 to-slate-900 border-b border-slate-700 lg:hidden shadow-2xl z-30">
          <div className="p-4 space-y-2">
            {/* Mobile User Info - Only for authenticated users */}
            {isAuthenticated && user && (
              <div className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-lg border border-slate-600 mb-4">
                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-orange-500/50 object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full border-2 border-orange-500/50 bg-linear-to-br from-orange-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold">
                      {user?.firstName?.charAt(0) || "U"}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-200">
                    {user?.fullName || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>
            )}

            {/* Mobile Menu Items */}
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm ${
                    activeMenu === item.label
                      ? "bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20"
                      : "text-gray-300 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  {Icon ? <Icon size={20} /> : null}
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Divider */}
            <div className="my-4 border-t border-slate-700"></div>

            {/* Unauthenticated Mobile Menu */}
            {!isAuthenticated && (
              <>
                <button
                  onClick={handleSignIn}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all text-sm font-medium"
                >
                  Sign In
                </button>
                <button
                  onClick={handleSignUp}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg transition-all text-sm font-medium shadow-lg shadow-orange-500/20"
                >
                  Sign Up
                </button>
              </>
            )}

            {/* Authenticated Mobile Menu */}
            {isAuthenticated && (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-gray-400 hover:text-orange-400 hover:bg-slate-700/50 rounded-lg transition-all text-sm font-medium flex items-center gap-3"
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </button>

                {/* Divider */}
                <div className="my-4 border-t border-slate-700"></div>

                {/* Logout Button in Mobile Menu */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowLogoutConfirm(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all text-sm font-medium border border-transparent hover:border-red-500/30"
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowLogoutConfirm(false)}
          />
          <div className="relative bg-linear-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl border border-slate-700 p-8 max-w-sm w-full">
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

export default Navbar;
