// src/Organisms/DashboardLayout.jsx
import React, { useState } from "react";
import Sidebar from "../Molecules/Sidebar"; // adjust path if needed

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-cyan-500 text-white px-6 py-4 shadow">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold"></h1>
            <div className="rounded-full bg-white text-cyan-500 w-8 h-8 flex items-center justify-center font-bold">R</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
