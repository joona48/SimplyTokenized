import React from "react";
import { Tag, Store, Building } from "lucide-react";
import SidebarToggle from "../atoms/SidebarToggle";


const Sidebar = ({ isOpen, onToggle }) => {
  return (
    <div className={`bg-white shadow-md h-full ${isOpen ? "w-64" : "w-16"} transition-all duration-300`}>
      <div className="flex items-center justify-between px-4 py-4 border-b">
        {isOpen && <span className="font-semibold">Rajagiri</span>}
        <SidebarToggle isOpen={isOpen} onToggle={onToggle} />
      </div>
      <nav className="mt-4 space-y-2">
        <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
          <Tag className="mr-2 h-5 w-5" />
          {isOpen && "Offerings"}
        </a>
        <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
          <Store className="mr-2 h-5 w-5" />
          {isOpen && "Token Store"}
        </a>
        <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
          <Building className="mr-2 h-5 w-5" />
          {isOpen && "Accounts"}
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
