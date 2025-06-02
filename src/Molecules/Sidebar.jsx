import React from "react";
import { Tag, Store, Building } from "lucide-react";
import SidebarToggle from "../atoms/SidebarToggle";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center px-4 py-2 rounded transition-colors duration-200 ${
      location.pathname === path
        ? "bg-gray-200 font-semibold"
        : "hover:bg-gray-100"
    }`;

  return (
    <div className={`bg-white shadow-md h-full ${isOpen ? "w-64" : "w-16"} transition-all duration-300`}>
      <div className="flex items-center justify-between px-4 py-4 border-b">
        {isOpen && <span className="font-semibold">Rajagiri</span>}
        <SidebarToggle isOpen={isOpen} onToggle={onToggle} />
      </div>
      <nav className="mt-4 space-y-2">
        <Link to="/Dashboard" className={linkClass("/offerings")}>
          <Tag className="mr-2 h-5 w-5" />
          {isOpen && "Offerings"}
        </Link>
        <Link to="/token-store" className={linkClass("/token-store")}>
          <Store className="mr-2 h-5 w-5" />
          {isOpen && "Token Store"}
        </Link>
        <Link to="/accounts" className={linkClass("/accounts")}>
          <Building className="mr-2 h-5 w-5" />
          {isOpen && "Accounts"}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
