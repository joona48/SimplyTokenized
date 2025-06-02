// src/Organisms/DashboardLayout.jsx
import HeaderBar from "./HeaderBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <HeaderBar />
      <main className="flex-1 flex justify-center items-center p-6">
        {children}
      </main>
    </div>
  );
}
