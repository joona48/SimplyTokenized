import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc as firestoreDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import DashboardLayout from "../Organisms/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useWalletClient, usePublicClient, useConnect } from "wagmi";
import contractABI from "../Constants/PublicTokenABI.json";
import bytecodeObj from "../Constants/bytecode.js";
import { toast } from "sonner";

const OfferingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deploying, setDeploying] = useState(false);
  const [orders, setOrders] = useState([]);

  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const { connectAsync } = useConnect();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const snapshot = await getDoc(firestoreDoc(db, "tokenMetadata", id));
      if (snapshot.exists()) {
        setTokenData(snapshot.data());
      } else {
        toast.error("No token found with the given ID.");
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!tokenData?.address) return;
      const q = query(
        collection(db, "orders"),
        where("contract", "==", tokenData.address)
      );
      const querySnapshot = await getDocs(q);
      const orderList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(orderList);
    };

    fetchOrders();
  }, [tokenData?.address]);

  const handleDeploy = async () => {
    if (!tokenData || !id) return toast.error("Missing token info");

    try {
      setDeploying(true);

      let wc = walletClient;

      if (!wc) {
        toast.info("Connecting wallet...");
        await connectAsync();
        await new Promise((res) => setTimeout(res, 1000));
        wc = (await import("wagmi")).getWalletClient?.();
        if (!wc) throw new Error("Wallet client not available after connect");
      }

      const hash = await wc.deployContract({
        abi: contractABI,
        bytecode: bytecodeObj.object,
        args: [tokenData.name, tokenData.symbol],
        account: wc.account.address,
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      const deployedAddress = receipt.contractAddress;

      await updateDoc(firestoreDoc(db, "tokenMetadata", id), {
        address: deployedAddress,
        status: "DEPLOYED",
      });

      toast.success(`Token deployed at ${deployedAddress}`);
      window.location.reload();
    } catch (err) {
      console.error("Deployment failed", err);
      toast.error("Deployment failed. Check console.");
    } finally {
      setDeploying(false);
    }
  };

  if (!tokenData && !loading) return <div className="p-6">Token not found.</div>;

  return (
    <DashboardLayout>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Loading token data...</p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 min-h-screen w-full p-6 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{tokenData.name}</h1>
                <p className="text-lg text-gray-600">01</p>
              </div>
              <Button
                className="px-5 py-2 bg-[#009fe3] hover:bg-[#007fc2] text-white font-medium rounded-md transition"
                onClick={() => navigate(`/testingerc20?address=${tokenData.address}`)}
              >
                Add Order
              </Button>
            </div>

            {!tokenData.address && (
              <div className="bg-[#e6f4ff] border border-[#e5e7eb] rounded-[8px] p-6 mb-6 text-center">
                <p className="mb-4">Waiting for deployment on the blockchain</p>
                <div className="flex justify-center">
                  <Button
                    onClick={handleDeploy}
                    disabled={deploying}
                    className="bg-[#009fe3] hover:bg-[#007fc2] text-white flex items-center justify-center gap-2"
                  >
                    {deploying && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    {deploying ? "Deploying..." : "Deploy now"}
                  </Button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Publication date</p>
                <p className="font-semibold">
                  {(() => {
                    const date = tokenData.createdAt?.toDate();
                    if (!date) return "";
                    return (
                      date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }) +
                      " " +
                      date.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })
                    );
                  })()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-bold">ERC20</p>
              </div>
              <div className="bg-blue-100 p-4 border border-[#e5e7eb] rounded-[8px]">
                <p className="text-sm text-gray-600 mb-1">Offering Status</p>
                <span className="text-sm bg-teal-600 text-white font-medium px-4 py-1 rounded-full inline-block">
                  {tokenData.status || "DRAFT"}
                </span>
              </div>
              <div className="bg-yellow-100 p-4 border border-[#e5e7eb] rounded-[8px]">
                <p className="text-sm text-gray-600 mb-1">Blockchain Status</p>
                <span className="text-sm bg-yellow-400 text-white font-medium px-4 py-1 rounded-full inline-block">
                  {tokenData.address ? "DEPLOYED" : "NEW"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <p className="text-lg font-semibold mb-3">Transaction History</p>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-1 rounded-full text-sm font-medium bg-gray-800 text-white">
                Orders
              </span>
            </div>

            {orders.length === 0 ? (
              <p className="text-gray-500 text-sm">No orders found for this token.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border-b pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">To</p>
                        <p className="font-medium">
                          {order.toAddress.slice(0, 6)}...{order.toAddress.slice(-4)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Amount</p>
                        <p className="font-medium">{order.amount}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Tx Hash</p>
                        {order.txHash ? (
                          <a
                            href={`https://sepolia.etherscan.io/tx/${order.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {order.txHash.slice(0, 6)}...{order.txHash.slice(-4)}
                          </a>
                        ) : (
                          <p className="text-gray-400 italic">Pending</p>
                        )}
                      </div>
                      <div>
                        <p className="text-gray-500">Status</p>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "MINTED"
                              ? "bg-green-200 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default OfferingDetail;
