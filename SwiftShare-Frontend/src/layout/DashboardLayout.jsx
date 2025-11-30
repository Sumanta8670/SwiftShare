import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar.jsx";
import SideBar from "../components/SideBar.jsx";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useUser();
  return (
    <div>
      {/* Navbar component goes here */}
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            {/* Sidebar */}
            <SideBar activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};
export default DashboardLayout;
