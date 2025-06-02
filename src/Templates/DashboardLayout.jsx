import React from "react";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "../Molecules/UserMenu"; // 👈 import the UserMenu

export default function DashboardLayout({ children }) {
  const location = useLocation();
  const showUserMenu = location.pathname === "/offerings"; // 👈 show only on specific route

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <div className="text-2xl font-bold text-[#0094d8] mb-6">
          Simply<span className="text-gray-800">Tokenized</span>
        </div>
        <nav className="space-y-4">
          <Link to="/offerings" className="block hover:text-[#0094d8]">🏷️ Offerings</Link>
          <Link to="/token-store" className="block hover:text-[#0094d8]">🧊 Token Store</Link>
          <Link to="/accounts" className="block hover:text-[#0094d8]">🏢 Accounts</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-cyan-500 text-white px-6 py-4 shadow">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            {showUserMenu && <UserMenu />} {/* ✅ Show only on /offerings */}
          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-100">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
