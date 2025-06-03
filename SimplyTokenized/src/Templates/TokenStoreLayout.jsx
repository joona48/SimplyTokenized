// src/Templates/TokenStoreLayout.jsx
import React, { useState } from "react";
import Sidebar from "@/Molecules/Sidebar";
import TokenStoreHeader from "@/Organisms/TokenStoreHeader";

const TokenStoreLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden relative flex-col">
      <div className="h-12 bg-cyan-500 text-white font-semibold flex items-center justify-between px-4 shadow-md">
        
        <TokenStoreHeader />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          className="z-0"
        />
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default TokenStoreLayout;
