import React, { useState, useEffect } from 'react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useWriteContract,          // ← v2 hook
  useWaitForTransactionReceipt,
  useChainId,
} from 'wagmi';
import { sepolia } from 'wagmi/chains';
import tokenABI from '@/Constants/PublicTokenABI.json';

const TOKEN_ADDRESS = '0xadafc293E1F687E73e0E0dbCEbCd86C292Ff8C46';

export default function MintToken() {
  /* ───────────────── wallet state ───────────────── */
  const { address, isConnected } = useAccount();
  const chainId = useChainId();                 // simpler than chain object
  const { connect, connectors, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();

  /* ───────────────── ui state ───────────────── */
  const [amount, setAmount] = useState('');
  const [hash, setHash]   = useState(null);

  /* ───────────────── contract write ───────────────── */
  const {
    data: writeData,
    status: writeStatus,                        // idle | pending | success | error
    error: writeError,
    writeContract,                             // ← the correct function name in v2
  } = useWriteContract();

  /* ───────────────── wait for confirmation ───────────────── */
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({ hash });

  /* ─────────────── store tx hash when we send one ─────────────── */
  useEffect(() => {
    if (writeData?.hash) setHash(writeData.hash);
  }, [writeData]);

  /* ─────────────── optional auto-connect on page load ─────────────── */
  useEffect(() => {
    const injected = connectors.find(c => c.id === 'injected');
    if (!isConnected && injected?.ready) connect({ connector: injected }).catch(() => {});
  }, [isConnected, connectors, connect]);

  /* ───────────────── handlers ───────────────── */
  const handleConnect = () => {
    const injected = connectors.find(c => c.id === 'injected');
    if (injected) connect({ connector: injected });
    else          alert('🦊 Install MetaMask to continue.');
  };

  const handleMint = () => {
    if (!amount || Number(amount) <= 0) return alert('Enter a positive amount.');

    if (!isConnected)          return alert('Connect your wallet first.');
    if (chainId !== sepolia.id) return alert('Switch MetaMask to Sepolia.');

    try {
      const mintAmount = BigInt(Math.floor(Number(amount) * 1e18));
      writeContract({
        address: TOKEN_ADDRESS,
        abi: tokenABI,
        functionName: 'mint',
        args: [mintAmount],
      });
    } catch (err) {
      console.error('mint error', err);
    }
  };

  /* ───────────────── derived flags ───────────────── */
  const isWriting   = writeStatus === 'pending';
  const btnDisabled = !isConnected || chainId !== sepolia.id || isWriting || isConfirming;

  /* ───────────────── ui ───────────────── */
  return (
    <div className="flex flex-col items-center justify-center mt-20 px-4">
      <p className="text-gray-600 mb-2 text-sm">
        {isConnected ? ` ${address.slice(0,6)}…${address.slice(-4)}` : ' Wallet not connected'}
      </p>

      {!isConnected ? (
        <>
          <button onClick={handleConnect}
                  className="bg-[#0094d8] hover:bg-[#16263f] text-white font-bold py-2 px-6 rounded mb-4">
            Connect Wallet
          </button>
          {connectError && <p className="text-red-600 text-sm">❌ {connectError.message}</p>}
        </>
      ) : (
        <>
          <button onClick={disconnect}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded mb-4">
            Disconnect
          </button>

          <h2 className="text-xl font-semibold mb-4">Mint Tokens</h2>
          <input type="number"
                 value={amount}
                 onChange={e => setAmount(e.target.value)}
                 placeholder="Amount"
                 className="border p-2 mb-4 rounded w-64 text-center" />

          <button onClick={handleMint}
                  disabled={btnDisabled}
                  className={`font-bold py-2 px-6 rounded ${
                    btnDisabled
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#0094d8] hover:bg-[#16263f] text-white'
                  }`}>
            {isWriting ? 'Sending…' : isConfirming ? 'Confirming…' : 'Mint Token'}
          </button>

          {/* network warning */}
          {isConnected && chainId !== sepolia.id && (
            <p className="text-orange-600 mt-2 text-sm">
              ⚠️ Switch MetaMask to Sepolia.
            </p>
          )}

          {/* errors + success */}
          {writeError && <p className="text-red-600 mt-2 text-sm">❌ {writeError.message}</p>}
          {isConfirmed && hash && (
            <p className="text-green-600 mt-2 text-sm">
              ✅ Minted!&nbsp;
              <a href={`https://sepolia.etherscan.io/tx/${hash}`}
                 target="_blank" rel="noopener noreferrer"
                 className="underline text-blue-600">view on Etherscan</a>
            </p>
          )}
        </>
      )}
    </div>
  );
}
