import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

import DashboardLayout from "../Organisms/DashboardLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

const TokenSummaryPage = () => {
  const [tokens, setTokens] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "tokens"), orderBy("createdAt", "desc")),
        snap => setTokens(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      ),
    []
  );

  return (
    <DashboardLayout>
      <div className="px-4 pt-4 pb-8 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {tokens.map(t => (
          <Card
            key={t.id}
            className="w-full overflow-hidden rounded-xl shadow-lg p-0"
          >
            {/* Blue header flush with top */}
            <div className="bg-[#33bdf2] text-white text-sm font-semibold py-2 text-center">
              Token
            </div>

            {/* Name + badge */}
            <CardHeader className="pt-6 pb-0 px-6">
              <CardTitle className="text-lg text-gray-700">{t.name}</CardTitle>
              <span className="bg-blue-800 text-white text-xs px-3 py-1 rounded-full mt-3 inline-block w-fit">
                DRAFT
              </span>
            </CardHeader>

            {/* Details */}
            <CardContent className="pt-4 px-6 pb-6 space-y-6">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Type</span>
                  <span className="font-medium text-gray-500">ERC20</span>
                </div>

                <div className="border-t" />

                <div className="flex justify-between">
                  <span className="text-gray-500">Symbol</span>
                  <span className="font-medium text-gray-500">{t.symbol}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default TokenSummaryPage;
