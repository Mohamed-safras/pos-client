import NavigationLink from "./NavigationLink";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import TableBarIcon from "@mui/icons-material/TableBar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

const Navigation = () => {
  const location = useLocation();
  // You can manage active state based on the current route
  const [activeLink, setActiveLink] = useState("/");

  const handleNavigation = (href: string) => {
    localStorage.setItem("activeLink", href);
    setActiveLink(href);
  };

  useEffect(() => {
    const storedActiveLink = localStorage.getItem("activeLink");

    storedActiveLink && setActiveLink(storedActiveLink);
  }, []);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#1f1f1f] py-2  flex justify-around items-center shadow-lg">
      <NavigationLink
        name={"Home"}
        href="/"
        active={activeLink === "/"}
        onClick={() => handleNavigation("/")}
        icon={<HomeIcon />}
      />
      <NavigationLink
        name={"Orders"}
        href="/app/orders"
        active={activeLink === "/app/orders"}
        onClick={() => handleNavigation("/app/orders")}
        icon={<MenuIcon />}
      />

      <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 p-3 bg-amber-400 rounded-full shadow-lg cursor-pointer flex items-center justify-center">
        <AddIcon fontSize="large" />
      </div>

      <NavigationLink
        name={"Tables"}
        href="/app/tables"
        active={activeLink === "/app/tables"}
        onClick={() => handleNavigation("/app/tables")}
        icon={<TableBarIcon />}
      />
      <NavigationLink
        name={"More"}
        href="/app/dashboard"
        active={false}
        onClick={() => {}}
        icon={
          <div className="flex items-center justify-center border-1 border-[var(--foreground-variant)] rounded-full">
            <MoreHorizIcon />
          </div>
        }
      />
    </footer>
  );
};

export default Navigation;
