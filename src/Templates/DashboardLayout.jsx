// src/Organisms/DashboardLayout.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="bg-cyan-500 text-white px-6 py-4 shadow flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="/a0ab1ec3-3639-4a4e-aff0-ab799ceef6ca.png"
            alt="Logo"
            className="h-10"
          />
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="rounded-full bg-white text-cyan-500 w-8 h-8 flex items-center justify-center font-bold">
          R
        </div>
      </header>

      <div className="flex flex-1">
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

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
