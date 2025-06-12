import React, { useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
import TokensStore from "./Pages/TokensStore";
import FireblocksForm from "./Pages/FireblocksForm";
import TokenStore from "./Pages/TokenStore";
import MintToken from "./Pages/MintToken";

const App = () => {
  useEffect(() => {
    axios
      .get("/api") // proxy handles this to http://localhost:5000/
      .then((response) => console.log("Backend says:", response.data))
      .catch((error) => console.error("Backend error:", error.message));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tokenstore" element={<TokenStore />} />
      <Route path="/custom-token" element={<TokensStore type="custom" />} />
      <Route path="/tokens-store" element={<TokensStore type="fireblocks" />} />
      <Route path="/fireblocks-form" element={<FireblocksForm />} />
      <Route path="/mint" element={<MintToken />} />
          </Routes>
  );
};

export default App;
