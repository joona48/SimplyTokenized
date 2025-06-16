import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

import DashboardLayout from "../Organisms/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const sharedInput =
  "w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 focus:ring-offset-white";

const FireblocksForm = () => {
  /* ─────────────────── state ─────────────────── */
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [integrateExisting, setIntegrateExisting] = useState(false);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [wallet, setWallet] = useState("");

  /* ─────────────────── routing ────────────────── */
  const { search } = useLocation();
  const navigate = useNavigate();
  const type =
    new URLSearchParams(search).get("type") === "custom"
      ? "ERC20 Custom"
      : "Fireblocks ERC20";

  /* ─────────────────── submit ─────────────────── */
  const handleOrder = async () => {
    if (!tokenName || !tokenSymbol || !wallet || !agreeTerms || integrateExisting) {
      alert("Please fill name, symbol, wallet, accept terms and leave 'existing token' unchecked.");
      return;
    }

    await addDoc(collection(db, "tokens"), {
      name: tokenName,
      symbol: tokenSymbol,
      wallet,
      status: "DRAFT",
      chain: "sepolia",
      createdAt: Timestamp.now(),
    });

    navigate("/token-summary");
  };

  const showTokenInput = agreeTerms && integrateExisting;

  /* ─────────────────── UI ─────────────────────── */
  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">{type}</h2>

        <div className="flex justify-center">
          <div className="w-[550px] bg-white rounded-2xl shadow-xl p-8 space-y-6">
            {/* Token name / symbol */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-600 mb-1 block">Token Name</Label>
                <input
                  className={sharedInput}
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-gray-600 mb-1 block">Symbol</Label>
                <input
                  className={sharedInput}
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value)}
                />
              </div>
            </div>

            {/* Minting platform */}
            <div>
              <Label className="text-gray-600 mb-1 block">Select Minting Platform</Label>
              <Select defaultValue="native">
                <SelectTrigger className={sharedInput}>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="native">NATIVE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Wallet */}
            <div>
              <Label className="text-gray-600 mb-1 block">Your Wallet</Label>
              <Select value={wallet} onValueChange={setWallet}>
                <SelectTrigger className={sharedInput}>
                  <SelectValue placeholder="Please Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0x37A2C03bcE372EBfFfD294513Ad8dadA594aE75B">
                    0x37A2C03bcE372EBfFfD294513Ad8dadA594aE75B
                  </SelectItem>
                  <SelectItem value="0x45C9972903c7101666CD4862c6c2305De03b4876">
                    0x45C9972903c7101666CD4862c6c2305De03b4876
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Chain */}
            <div>
              <Label className="text-gray-600 mb-1 block">Blockchain</Label>
              <Select defaultValue="sepolia">
                <SelectTrigger className={sharedInput}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="polygon">Polygon</SelectItem>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="sepolia">Sepolia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Cost breakdown */}
            <div className="bg-gray-100 p-4 rounded-md text-sm space-y-1">
              <div className="flex justify-between">
                <span>One‑time costs</span>
                <span>€ 200</span>
              </div>
              <div className="flex justify-between">
                <span>Value Added Tax</span>
                <span>€ 40</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>€ 240</span>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Checkbox
                  checked={agreeTerms}
                  onCheckedChange={(v) => setAgreeTerms(Boolean(v))}
                />
                <Label className="text-sm">
                  I confirm the{" "}
                  <a className="text-blue-600 underline" href="#">
                    Terms of service
                  </a>{" "}
                  and{" "}
                  <a className="text-blue-600 underline" href="#">
                    Privacy Disclaimer
                  </a>
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  checked={integrateExisting}
                  onCheckedChange={(v) => setIntegrateExisting(Boolean(v))}
                />
                <Label className="text-sm">
                  I want to integrate an existing token
                </Label>
              </div>
            </div>

            {/* Conditional address field */}
            {showTokenInput && (
              <div>
                <Label className="text-gray-600 mb-1 block">Token Address</Label>
                <input className={sharedInput} />
              </div>
            )}

            {/* CTA */}
            <Button
              className="w-full bg-[#009fe3] hover:bg-[#0086c2] text-white"
              onClick={handleOrder}
            >
              Order
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FireblocksForm;
