import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Logo from "../assets/logo.jpg";

const Navigation: React.FC = () => {
  return (
    <nav className="sticky top-0 z-100 bg-[var(--background)] shadow-lg">
      <div className="px-6 py-4 flex justify-between items-center">
        {/* logo */}
        <div className="flex items-center space-x-2 text-lg font-bold rounded-full">
          <img
            src={Logo}
            alt="Logo"
            className="h-8 w-8 object-cover rounded-full"
          />
          <h1 className="text-lg font-semibold text-[var(--foreground)]">
            Restro
          </h1>
        </div>

        {/* search bar*/}
        <div className="flex items-center space-x-2 bg-[#1f1f1f] rounded-xl px-5 py-2 md:min-w-[300px] lg:min-w-[400px]">
          <SearchIcon className="text-[var(--foreground)]" />
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none w-full text-xs bg-transparent text-white placeholder-[var(--foreground-variant)]"
          />
        </div>

        {/* user profile and notifications */}
        <div className="flex items-center space-x-2">
          <div>
            <NotificationsNoneIcon className="text-white cursor-pointer" />
          </div>
          <div>
            <AccountCircleIcon
              className="text-white cursor-pointer"
              style={{ fontSize: "2rem" }}
            />
          </div>

          <div className="flex flex-col">
            <h3 className="text-sm text-white">Welcome, Safras</h3>
            <p className="text-xs text-[var(--muted-foreground)]">Admin</p>
          </div>
          <button className="hidden bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
