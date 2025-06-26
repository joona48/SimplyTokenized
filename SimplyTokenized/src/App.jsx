import React, { useEffect } from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner"; // ✅ Import Sonner Toaster

import Dashboard from "./Pages/Dashboard";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
import TokensStore from "./Pages/TokensStore";
import FireblocksForm from "./Pages/FireblocksForm";
import TokenStore from "./Pages/TokenStore";
import MintToken from "./Pages/MintToken";
import TokenSummaryPage from "./Pages/TokenSummaryPage";
import OfferingDetail from "./Pages/OfferingDetail";
import TestingERC20 from "./Pages/TestingERC20";

const App = () => {
  useEffect(() => {
    axios
      .get("/api")
      .then((response) => console.log("Backend says:", response.data))
      .catch((error) => console.error("Backend error:", error.message));
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tokenstore" element={<TokenStore />} />
        <Route path="/custom-token" element={<TokensStore type="custom" />} />
        <Route path="/tokens-store" element={<TokensStore type="fireblocks" />} />
        <Route path="/fireblocks-form" element={<FireblocksForm />} />
        <Route path="/token-summary" element={<TokenSummaryPage />} />
        <Route path="/offering/:id" element={<OfferingDetail />} />
        <Route path="/testingerc20" element={<TestingERC20 />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>

      {/* ✅ Add the Sonner Toaster here */}
      <Toaster position="bottom-center" richColors />
    </>
  );
};

export default App;
