import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Molecules/Sidebar";
import UserMenu from "../Molecules/UserMenu";
import SidebarToggle from "../atoms/SidebarToggle";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="bg-cyan-500 text-white h-16 shadow flex items-center px-4 z-50">
        <div className="flex items-center gap-4 w-full">
          <SidebarToggle isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/Image/Simplyimage.png"
              alt="Simply Tokenized Logo"
              className="w-[250px] h-[45px] opacity-90"
            />
          </Link>
        </div>
        <div className="ml-auto rounded-full bg-white text-cyan-500 w-8 h-8 flex items-center justify-center font-bold">
          <UserMenu />
        </div>
      </header>

      {/* Main content with Sidebar below header */}
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 p-6 bg-gray-100">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}