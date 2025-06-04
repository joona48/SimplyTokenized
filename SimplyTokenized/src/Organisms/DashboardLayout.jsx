import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Molecules/Sidebar";
import UserMenu from "../Molecules/UserMenu";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header Bar */}
      <header className="bg-cyan-500 text-white h-16 flex items-center justify-between px-4">
        {/* Logo only */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/Image/Simplyimage.png"
            alt="Simply Tokenized Logo"
            className="w-[200px] h-[40px] opacity-90"
          />
        </Link>

        {/* User Avatar */}
        <div className="rounded-full bg-white text-cyan-500 w-8 h-8 flex items-center justify-center font-bold">
          <UserMenu />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar below header */}
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
