import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePublicClient, useWalletClient } from "wagmi";
import { addDoc, collection, Timestamp } from "firebase/firestore";

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

import contractABI from "@/Constants/PublicTokenABI.json";
import bytecodeObj from "@/Constants/bytecode.js";
import { db } from "../firebase";

const sharedStyle =
  "w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 focus:ring-offset-white";

const FireblocksForm = () => {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [existingToken, setExistingToken] = useState(false);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const DEPLOYER_WALLET = "0x37A2C03bcE372EBfFfD294513Ad8dadA594aE75B";
  const showTokenInput = agreeTerms && existingToken;
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type") || "fireblocks";
  const title = type === "custom" ? "ERC20 Custom" : "Fireblocks ERC20";
const handleDeploy = async () => {
  if (!tokenName || !tokenSymbol || !agreeTerms || existingToken) {
    alert("Please enter token name/symbol, agree to terms, and avoid existing token.");
    return;
  }

  try {
    const hash = await walletClient.deployContract({
      abi: contractABI,
      bytecode: bytecodeObj.object,
      args: [tokenName, tokenSymbol],
      account: DEPLOYER_WALLET,
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    const contractAddress = receipt.contractAddress;

    await addDoc(collection(db, "tokenMetadata"), {
      name: tokenName,
      symbol: tokenSymbol,
      abi: JSON.stringify(contractABI),
      bytecode: bytecodeObj.object,
      decimal: 18,
      status: "Deployed",
      chain: "sepolia",
      address: contractAddress,
      createdBy: DEPLOYER_WALLET,
      createdAt: Timestamp.now(),
    });

    navigate(`/mint?address=${contractAddress}`);
  } catch (err) {
    console.error("Deployment error:", err);
    alert("Deployment failed. Check console for details.");
  }
};

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <div className="w-[500px] bg-white rounded-xl shadow-md p-6 space-y-6 ml-32">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-600 mb-1 block">Token Name</Label>
                <input
                  type="text"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  className={sharedStyle}
                />
              </div>
              <div>
                <Label className="text-gray-600 mb-1 block">Symbol</Label>
                <input
                  type="text"
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value)}
                  className={sharedStyle}
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-600 mb-1 block">Select Minting Platform</Label>
              <Select defaultValue="native">
                <SelectTrigger className={sharedStyle}>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="native">NATIVE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-600 mb-1 block">Your Wallet</Label>
              <Select>
                <SelectTrigger className={sharedStyle}>
                  <SelectValue placeholder="Please Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wallet1">0x37A2C03bcE372EBfFfD294513Ad8dadA594aE75B</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-600 mb-1 block">Blockchain</Label>
              <Select defaultValue="sepolia">
                <SelectTrigger className={sharedStyle}>
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
                <span>One-time costs</span>
                <span>€ 200</span>
              </div>
              <div className="flex justify-between">
                <span>Value Added Tax</span>
                <span>€ 40</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>€ 240</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(val) => setAgreeTerms(Boolean(val))}
                  className="border border-gray-300 rounded-sm data-[state=checked]:bg-blue-400 data-[state=checked]:text-white focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
                <Label htmlFor="terms" className="text-sm">
                  I confirm the{" "}
                  <a className="text-blue-600 underline" href="#">Terms of service</a> and{" "}
                  <a className="text-blue-600 underline" href="#">Privacy Disclaimer</a>
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="existing-token"
                  checked={existingToken}
                  onCheckedChange={(val) => setExistingToken(Boolean(val))}
                  className="border border-gray-300 rounded-sm data-[state=checked]:bg-blue-400 data-[state=checked]:text-white focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
                <Label htmlFor="existing-token" className="text-sm">
                  I want to integrate an existing token
                </Label>
              </div>
            </div>

            {showTokenInput && (
              <div>
                <Label className="text-gray-600 mb-1 block">Token Address</Label>
                <input className={sharedStyle} />
              </div>
            )}

            <Button
              className="w-full bg-[#009fe3] hover:bg-[#0086c2] text-white"
              onClick={handleDeploy}
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
