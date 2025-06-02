import React from "react";
import DashboardLayout from "../Organisms/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="bg-white shadow p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Start building your first Offer</h1>
        <p>You haven’t created any offers yet! Create and publish your token with simple steps.</p>
        <button className="mt-4 bg-[#0094d8] text-white py-2 px-4 rounded">
          Create your first offer
        </button>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
