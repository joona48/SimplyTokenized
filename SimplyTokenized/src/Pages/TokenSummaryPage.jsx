import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
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

export default function TokenSummaryPage() {
  const [tokens, setTokens] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "tokenMetadata"), orderBy("createdAt", "desc")),
      (snap) => {
        const result = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setTokens(result);
      }
    );
    return () => unsub();
  }, []);

  const handleCardClick = (id) => {
    setLoadingId(id);
    setTimeout(() => {
      navigate(/offering/${id});
    }, 500);
  };

  return (
    <DashboardLayout>
      <div className="px-4 pt-4 pb-8 grid gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {tokens.map((t) => {
          const badgeStyle = statusStyles[t.status] ?? statusStyles.DRAFT;
          const isLoading = loadingId === t.id;

          return (
            <div
              key={t.id}
              onClick={() => handleCardClick(t.id)}
              className="block relative"
            >
              <Card className="w-[280px] h-[300px] mx-auto rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow p-0 flex flex-col">
                {/* Top label */}
                <div className="w-full bg-[#038EDC] text-white text-xs font-semibold py-1 px-4 text-center rounded-t-xl">
                  Token
                </div>

                {/* Spinner Overlay */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/40 z-10 rounded-xl">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}

                {/* Token Info */}
                <CardHeader className="pt-3 pb-0 px-6 flex flex-col items-start gap-2 flex-grow">
                  <div className="flex justify-between items-center w-full">
                    <h3 className="text-[17px] font-semibold text-gray-700">
                      {t.name}
                    </h3>
                    <span
                      className={text-[11px] px-2.5 py-0.5 rounded-full font-medium ${badgeStyle}}
                    >
                      {t.status ?? "DRAFT"}
                    </span>
                  </div>

                  {t.address && (
                    <div className="bg-blue-50 text-gray-600 text-xs font-mono px-2 py-1 rounded-full flex items-center gap-2 max-w-full truncate">
                      <span>
                        {t.address.slice(0, 6)}...{t.address.slice(-4)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(t.address);
                          // Optionally show toast if you use sonner
                          // toast.success("Copied to clipboard");
                        }}
                        className="hover:text-black"
                        title="Copy address"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
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
                </CardHeader>

                {/* Metadata pinned to bottom */}
                <CardContent className="mt-auto px-6 pb-6 pt-6 space-y-2 text-xs text-gray-600">
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
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}

