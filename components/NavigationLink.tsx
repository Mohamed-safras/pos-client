import React from "react";
import { Link } from "react-router";
import type { NavigationLinkProps } from "types/common.interface";

const NavigationLink: React.FC<NavigationLinkProps> = ({
  name,
  href,
  icon,
  children,
  active,
  onClick,
}) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={`flex items-center rounded-3xl px-16 py-2 text-[var(--foreground-variant)] ${active && "bg-[var(--background-variant-light)] text-white"}`}
    >
      {icon}
      <span className="ml-2">{name}</span>
    </Link>
  );
};

export default NavigationLink;
