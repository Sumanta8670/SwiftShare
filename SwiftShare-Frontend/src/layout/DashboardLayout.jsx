import { useUser } from "@clerk/clerk-react";
import SideBar from "../components/SideBar.jsx";
import Navbar from "../components/Navbar.jsx";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navbar */}

      {/* Main Layout */}
      {user && (
        <div className="flex relative min-h-[calc(100vh-61px)]">
          {/* Desktop Sidebar - Only visible on xl screens */}
          <div className="hidden xl:block">
            <SideBar activeMenu={activeMenu} />
          </div>

          {/* Main Content - Full width on mobile/tablet, adjusts on desktop */}
          <div className="flex-1 w-full">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
