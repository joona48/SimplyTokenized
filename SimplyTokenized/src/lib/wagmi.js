import { createConfig, http } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { sepolia } from 'wagmi/chains';

export const wagmiConfig = createConfig({
  chains: [sepolia], // ✅ Required at top level!
  connectors: [
    injected({ chains: [sepolia] }),
  ],
  transports: {
    [sepolia.id]: http(), // You can customize with Infura/Alchemy etc.
  },
  ssr: false,
});
