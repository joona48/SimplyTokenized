import { useEffect, useState } from "react";
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
import { useAccount, useConnect } from "wagmi";
import contractABI from "../Constants/PublicTokenABI.json";
import bytecodeObj from "../Constants/bytecode";

const walletOptions = [
  "0x37A2C03bcE372EBfFfD294513Ad8dadA594aE75B",
  "0x45C9972903c7101666CD4862c6c2305De03b4876",
  "0xCF02568132D2E037Bc748eCdD972906555A968d1",
];

const inputStyle =
  "w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300";

export default function FireblocksForm() {
  const [agree, setAgree] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);
  const [existing, setExisting] = useState(false);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);

  const { address: connected, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();

  const navigate = useNavigate();
  const { search } = useLocation();

  const type =
    new URLSearchParams(search).get("type") === "custom"
      ? "ERC20 Custom"
      : "Fireblocks ERC20";

  useEffect(() => {
    if (isConnected && !wallet) setWallet(connected);
  }, [isConnected, connected]);

  useEffect(() => {
    if (wallet) {
      localStorage.setItem("selectedWallet", wallet);
    }
  }, [wallet]);

  const mismatch =
    connected &&
    wallet &&
    connected.toLowerCase() !== wallet.toLowerCase();

  const handleOrder = async () => {
    setCheckboxError(false);

    if (!agree) {
      setCheckboxError(true);
      return;
    }

    if (!name || !symbol || !wallet || existing) {
      alert("Please complete all fields.");
      return;
    }

    if (!isConnected) {
      const injectedConnector = connectors.find((c) => c.id === "injected");
      if (!injectedConnector) throw new Error("No injected connector found");

      const { accounts } = await connectAsync({ connector: injectedConnector });
      if (!accounts?.[0]) {
        alert("Failed to connect to MetaMask.");
        return;
      }
      setWallet(accounts[0]);
    }

    if (connected?.toLowerCase() !== wallet.toLowerCase()) {
      alert("Connected wallet does not match selected wallet.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "tokenMetadata"), {
        name,
        symbol,
        abi: JSON.stringify(contractABI),
        bytecode: bytecodeObj.object,
        decimal: 18,
        status: "DRAFT",
        chain: "sepolia",
        address: "",
        wallet,
        createdAt: Timestamp.now(),
      });

      navigate("/token-summary");
    } catch (err) {
      console.error("Order failed:", err);
      alert("Failed to place order. See console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/30 z-50">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-6">{type}</h2>
        <div className="flex justify-center">
          <div className="w-[550px] bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Token Name</Label>
                <input
                  className={inputStyle}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label>Symbol</Label>
                <input
                  className={inputStyle}
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Wallet</Label>
              <Select
                value={wallet}
                onValueChange={(value) => {
                  setWallet(value);
                  localStorage.setItem("selectedWallet", value);
                }}
              >
                <SelectTrigger className={inputStyle}>
                  <SelectValue placeholder="Select Wallet" />
                </SelectTrigger>
                <SelectContent>
                  {[...new Set([connected, ...walletOptions])].map(
                    (addr) =>
                      addr && (
                        <SelectItem key={addr} value={addr}>
                          {addr}
                        </SelectItem>
                      )
                  )}
                </SelectContent>
              </Select>
              {mismatch && (
                <p className="text-xs text-red-600 mt-1">
                  Connected wallet and selected wallet do not match.
                </p>
              )}
            </div>

            <div>
              <Label>Blockchain</Label>
              <Select defaultValue="sepolia">
                <SelectTrigger className={inputStyle}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="polygon">Polygon</SelectItem>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="sepolia">Sepolia</SelectItem>
                </SelectContent>
              </Select>
            </div>

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

            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Checkbox
                  checked={agree}
                  onCheckedChange={(v) => {
                    setAgree(Boolean(v));
                    setCheckboxError(false);
                  }}
                />
                <Label className="text-sm">
                  I confirm the{" "}
                  <a href="#" className="text-blue-600 underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 underline">
                    Privacy Disclaimer
                  </a>
                </Label>
              </div>
              {checkboxError && (
                <p className="text-sm text-red-600 ml-6">
                  Please agree to the Terms and Privacy Disclaimer.
                </p>
              )}
            </div>

            {agree && existing && (
              <div>
                <Label>Token Address</Label>
                <input className={inputStyle} />
              </div>
            )}

            <Button
              className="w-full bg-[#009fe3] text-white hover:bg-[#007bbf]"
              onClick={handleOrder}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                "Order"
              )}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
