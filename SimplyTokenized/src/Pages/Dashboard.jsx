import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

import DashboardLayout from "../Organisms/DashboardLayout";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";

const statusStyles = {
  DRAFT: "bg-blue-800 text-white",
  NEW: "bg-yellow-500 text-white",
  FAILED: "bg-red-600 text-white",
  DEPLOYED: "bg-green-600 text-white",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "tokenMetadata"), orderBy("createdAt", "desc")),
        (snap) => setTokens(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      ),
    []
  );

  const handleCardClick = (id) => {
    navigate(`/offering/${id}`);
  };

  return (
    <DashboardLayout>
      {tokens.length === 0 ? (
        <>
          <div className="mt-20 text-center" />
          <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center leading-[0.9]">
            Start building your first Offer
          </h2>
          <p className="text-gray-800 mb-8 text-center leading-[0.4]">
            You haven’t created any offers yet! Create and publish your token
            with simple steps
          </p>

          <div className="flex justify-center">
            <button
              onClick={() => navigate("/tokenstore")}
              className="flex items-center justify-center gap-2 text-lg font-bold bg-[#0094d8] hover:bg-[#16263f] text-white rounded-md px-6 py-3 transition-all duration-300"
            >
              <i className="icon-plus mr-2" />
              Create your first offer
            </button>
          </div>
        </>
      ) : (
        <div className="px-4 pt-4 pb-8 grid gap-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {tokens.map((t) => {
            const badgeStyle = statusStyles[t.status] ?? statusStyles.DRAFT;

            return (
              <Card
                key={t.id}
                onClick={() => handleCardClick(t.id)}
                className="w-[280px] h-[300px] mx-auto rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow p-0"
              >
                {/* Blue header */}
                <div className="w-full bg-[#038EDC] text-white text-xs font-semibold py-1 px-4 text-center rounded-t-xl">
                  Token
                </div>

                {/* Top Section: Name, Badge, Address (side‑by‑side) */}
                <div className="px-6 pt-3 flex flex-col items-start gap-3">
                  <h3 className="text-[15px] font-semibold text-gray-500 mt-1">
                    {t.name}
                  </h3>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[11px] px-2.5 py-0.5 rounded-lg font-medium ${badgeStyle}`}
                    >
                      {t.status ?? "DRAFT"}
                    </span>

                    {t.address && (
                      <div className="bg-blue-100 text-gray-700 text-sm font-mono px-3 py-1 rounded-lg flex items-center gap-2 max-w-[170px] truncate">
                        <span>
                          {t.address.slice(0, 6)}...{t.address.slice(-4)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            navigator.clipboard.writeText(t.address);
                          }}
                          className="hover:text-black"
                          title="Copy address"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2M16 8h2a2 2 0 012 2v8a2 2 0 01-2 2h-8a2 2 0 01-2-2v-2"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Section: Type & Symbol */}
                <CardContent className="pt-6 px-6 pb-6 space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Type</span>
                    <span className="font-medium">ERC20</span>
                  </div>
                  <div className="border-t" />
                  <div className="flex justify-between">
                    <span>Symbol</span>
                    <span className="font-medium">{t.symbol}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
