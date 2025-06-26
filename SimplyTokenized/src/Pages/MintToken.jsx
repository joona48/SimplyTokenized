// MintToken.jsx

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import tokenABI from "@/Constants/PublicTokenABI.json";

const MintToken = () => {
  const [searchParams] = useSearchParams();
  const contractAddress = searchParams.get("address");

  const [mintAmount, setMintAmount] = useState("");
  const [receiver, setReceiver] = useState("");

  const { data: hash, writeContract } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleMint = () => {
    if (!receiver || !mintAmount) {
      alert("Please enter recipient and amount");
      return;
    }

    writeContract({
      address: contractAddress,
      abi: tokenABI,
      functionName: "mintTo",
      args: [receiver, parseEther(mintAmount)],
    });
  };

  return (
    <div className="p-6 max-w-lg mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Mint Tokens</h2>
      <input
        placeholder="Recipient wallet address"
        className="w-full p-2 border rounded"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />
      <input
        placeholder="Amount (in whole tokens)"
        className="w-full p-2 border rounded"
        value={mintAmount}
        onChange={(e) => setMintAmount(e.target.value)}
      />
      <button onClick={handleMint} className="bg-blue-600 text-white px-4 py-2 rounded">
        Mint
      </button>
      {isLoading && <p>Minting in progress...</p>}
      {isSuccess && <p className="text-green-600">Minted successfully! TX Hash: {hash}</p>}
    </div>
  );
};

export default MintToken;

