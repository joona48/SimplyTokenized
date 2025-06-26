import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
  useAccount,
} from "wagmi";
import { parseUnits } from "viem";
import {
  addDoc,
  collection,
  Timestamp,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import tokenABI from "@/Constants/PublicTokenABI.json";
import { mainnet, sepolia, optimism } from "wagmi/chains";
import { toast } from "sonner";

const chainMap = {
  [mainnet.id]: mainnet.name,
  [sepolia.id]: sepolia.name,
  [optimism.id]: optimism.name,
};

const decimals = 8;

export default function TestingERC20() {
  const [searchParams] = useSearchParams();
  const contractAddress = searchParams.get("address");
  const navigate = useNavigate();

  const [receiver, setReceiver] = useState("");
  const [mintAmount, setMintAmount] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // For Order button
  const [isMinting, setIsMinting] = useState(false); // For Mint button

  const { address: fromAddress, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: hash, writeContract } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({ hash });

  const walletAddresses = [
    { label: "Wallet 1", address: "0x608833e39D705d1E580B52d81968A4ABc20A5F61" },
    { label: "Wallet 2", address: "0xCF02568132D2E037Bc748eCdD972906555A968d1" },
    { label: "Wallet 3", address: "0x45C9972903c7101666CD4862c6c2305De03b4876" },
  ];

  const saveOrder = async () => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "orders"), {
        amount: mintAmount,
        decimals,
        toAddress: receiver,
        fromAddress: fromAddress ?? "0x0",
        createdAt: Timestamp.now(),
        chainId,
        contract: contractAddress,
        status: "ORDERED",
      });
      setOrderPlaced(true);
      toast.success("Order placed. Now click 'Mint' to execute.");
    } catch (err) {
      console.error("Failed to save order:", err);
      toast.error("Order save failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOrderOrMint = async () => {
    if (!receiver || !mintAmount) {
      toast.error("Enter recipient wallet and amount.");
      return;
    }

    if (!isConnected) {
      toast.error("Connect your wallet first.");
      return;
    }

    if (!orderPlaced) {
      await saveOrder();
      return;
    }

    // Minting
    try {
      setIsMinting(true);
      const amountParsed = parseUnits(mintAmount, decimals);
      toast.info("Sending mint transaction...");
      writeContract({
        address: contractAddress,
        abi: tokenABI,
        functionName: "mintTo",
        args: [receiver, amountParsed],
      });
    } catch (err) {
      console.error("Mint failed:", err);
      toast.error("Mint failed. Check console.");
      setIsMinting(false);
    }
  };

  useEffect(() => {
    const updateOrderStatus = async () => {
      if (!isSuccess || !hash || !contractAddress || !receiver) return;

      try {
        const q = query(
          collection(db, "orders"),
          where("contract", "==", contractAddress),
          where("toAddress", "==", receiver),
          where("status", "==", "ORDERED")
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const orderDoc = snapshot.docs[0];
          await updateDoc(doc(db, "orders", orderDoc.id), {
            status: "MINTED",
            txHash: hash,
          });
        }

        toast.success("Minted successfully! Redirecting...");
        const tokenQ = query(
          collection(db, "tokenMetadata"),
          where("address", "==", contractAddress)
        );
        const tokenSnap = await getDocs(tokenQ);
        if (!tokenSnap.empty) {
          const tokenDoc = tokenSnap.docs[0];
          navigate(`/offering/${tokenDoc.id}`);
        } else {
          toast.error("Unable to find token metadata for redirection.");
        }
      } catch (err) {
        console.error("Post-mint error:", err);
        toast.error("Error after minting.");
      } finally {
        setIsMinting(false);
      }
    };

    updateOrderStatus();
  }, [isSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-8">Testing ERC20</h2>

        <div className="space-y-6">
          {/* Amount input */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-500">Amount</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Amount to mint"
                value={mintAmount}
                onChange={(e) => setMintAmount(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 px-2 py-1 rounded text-sm text-gray-600">
                {decimals}
              </span>
            </div>
          </div>

          {/* Wallet select */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-500">Account</label>
            <select
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Please select Account</option>
              {walletAddresses.map((w) => (
                <option key={w.address} value={w.address}>
                  {w.label} ({w.address.slice(0, 6)}…{w.address.slice(-4)})
                </option>
              ))}
            </select>
          </div>

          {/* Chain info */}
          {receiver && chainId && (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-500">
                Blockchain Wallet
              </label>
              <p className="text-sm text-gray-500">
                Network: {chainMap[chainId] || "Unknown"} (Chain ID: {chainId})
              </p>
            </div>
          )}

          {/* Button with loading */}
          <div className="flex justify-center">
            <button
              onClick={handleOrderOrMint}
              disabled={isSubmitting || isMinting}
              className="bg-blue-500 text-white px-8 py-2 rounded hover:bg-blue-400 transition-colors flex items-center gap-2"
            >
              {(isSubmitting || isMinting) && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {orderPlaced ? "Mint" : "Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
