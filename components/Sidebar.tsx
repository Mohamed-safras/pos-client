import React from "react";
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  UtensilsCrossed,
  PieChart,
  Wallet,
  Settings,
  LogOut,
  ChevronDown,
  ChefHat,
} from "lucide-react";

const Sidebar = () => {
  // Determine active style
  const activeClass = "bg-[#1f1f1f] text-white shadow-lg shadow-gray-200";
  const inactiveClass = "text-gray-500 hover:bg-gray-100 hover:text-gray-900";

  return (
    <div className="w-64 bg-white border-r border-gray-100 h-screen flex flex-col shrink-0">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1f1f1f] rounded-lg flex items-center justify-center text-white font-bold text-lg">
            P
          </div>
          <span className="font-bold text-gray-800 text-xl">Pospay</span>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-1">
        {/* Main Group */}
        <div className="mb-6">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase mb-2">
            Menu
          </p>
          <nav className="space-y-1">
            <NavLink
              to="/app/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive ? activeClass : inactiveClass}`
              }
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/app/pos"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive ? activeClass : inactiveClass}`
              }
            >
              <UtensilsCrossed size={20} />
              <span>Menu Order</span>
            </NavLink>
            <NavLink
              to="/app/products"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive ? activeClass : inactiveClass}`
              }
            >
              <ChefHat size={20} />
              <span>Manage Dish</span>
            </NavLink>
            <NavLink
              to="/app/analytics"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive ? activeClass : inactiveClass}`
              }
            >
              <PieChart size={20} />
              <span>Analytics</span>
            </NavLink>
            <NavLink
              to="/app/withdrawal"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive ? activeClass : inactiveClass}`
              }
            >
              <Wallet size={20} />
              <span>Withdrawal</span>
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-100 space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
              isActive
                ? "bg-[#1f1f1f] text-white shadow-lg shadow-gray-200"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            }`
          }
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
        <button
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-red-500 hover:bg-red-50`}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
