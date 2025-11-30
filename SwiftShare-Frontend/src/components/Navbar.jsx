import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Menu, Share2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar.jsx";
import CreditDisplay from "./CreditDisplay.jsx";
import { useContext } from "react";
import { UserCreditsContext } from "../context/UserCreditsContext.jsx";

const Navbar = ({ activeMenu }) => {
  const { credits, fetchUserCredits } = useContext(UserCreditsContext);
  const [openSideMenu, setOpenSidemenu] = useState(false);

  useEffect(() => {
    fetchUserCredits();
  }, [fetchUserCredits]);
  return (
    <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
      {/** Left side - menu button and title */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => setOpenSidemenu(!openSideMenu)}
          className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors"
        >
          {openSideMenu ? (
            <X className="text-2xl" />
          ) : (
            <Menu className="text-2xl" />
          )}
        </button>
        <div className="flex items-center gap-2">
          <Share2 className="text-blue-600" />
          <span className="text-lg font-medium text-black truncate">
            SwiftShare
          </span>
        </div>
      </div>
      {/** Right side - credit and user button */}
      <SignedIn>
        <div className="flex items-center gap-4">
          <Link to="/subscription">
            <CreditDisplay credits={credits} />
          </Link>
          <div className="relative">
            <UserButton />
          </div>
        </div>
      </SignedIn>
      {/** Mobile side menu */}
      {openSideMenu && (
        <div className="fixed top-[73px] left-0 right-0 bg-white border-b border-gray-700 lg:hidden z-20">
          {/** Side menu Bar */}
          <SideBar activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
