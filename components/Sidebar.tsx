import React from "react";
import { useLocation, Link } from "react-router";

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: "fas fa-tachometer-alt",
    },
    {
      path: "/pos",
      label: "POS / Sales",
      icon: "fas fa-cash-register",
    },
    {
      path: "/products",
      label: "Products",
      icon: "fas fa-box",
    },
    {
      path: "/orders",
      label: "Orders",
      icon: "fas fa-list",
    },
    {
      path: "/reports",
      label: "Reports",
      icon: "fas fa-chart-bar",
    },
  ];

  return (
    <nav className="p-4">
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <i className={`${item.icon} mr-3`}></i>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
