import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../Organisms/DashboardLayout";

const Dashboard = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleCreateOffer = () => {
    navigate("/tokenstore"); // Adjust path to your route
  };

  return (
    <DashboardLayout>
      <div className="mt-20 text-center"></div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center leading-[0.9]">
        Start building your first Offer
      </h2>
      <p className="text-gray-800 mb-4 text-center leading-[0.4]">
        You haven’t created any offers yet! Create and publish your token with simple steps
      </p>

      <div className="flex justify-center">
  <button
    onClick={handleCreateOffer}
    className="flex items-center justify-center gap-2 text-lg font-bold bg-[#0094d8] hover:bg-[#16263f] text-white rounded-md px-6 py-3 mt-4 w-xl h-12 transition-all duration-300 leading-[0.4]"
  >
    <i className="icon-plus mr-2"></i>
    Create your first offer
  </button>
</div>

{/* New Mint Button */}
<div className="flex justify-center">
  <button
    onClick={() => navigate("/mint")}
    className="flex items-center justify-center gap-2 text-lg font-bold bg-[#0094d8] hover:bg-[#16263f] text-white rounded-md px-6 py-3 mt-4 w-xl h-12 transition-all duration-300 leading-[0.4]"
  >
    <i className="icon-plus mr-2"></i>
    Mint Token
  </button>
</div>

    </DashboardLayout>
  );
};

export default Dashboard;
