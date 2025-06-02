import React from "react";
import DashboardLayout from "../Organisms/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="bg-white shadow p-8 rounded-lg max-w-2xl w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Start building your first Offer</h1>
        <p className="text-gray-600">
          You haven’t created any offers yet! Create and publish your token with simple steps.
        </p>
        <button className="mt-6 bg-[#0094d8] hover:bg-[#007bb3] text-white font-semibold py-2 px-6 rounded">
          Create your first offer
        </button>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
