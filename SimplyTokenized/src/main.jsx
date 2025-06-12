import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ This line is required!
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from './lib/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WagmiConfig>
    </QueryClientProvider>
  </React.StrictMode>
);
