import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
import TokensStore from "./Pages/TokensStore";
import FireblocksForm from "./Pages/FireblocksForm"



const App = () => {
  useEffect(() => {
    axios
      .get("/api") // proxy handles this to http://localhost:5000/
      .then((response) => console.log("Backend says:", response.data))
      .catch((error) => console.error("Backend error:", error.message));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/token-store" element={<TokensStore />} />
        <Route path="/fireblocks-form" element={<FireblocksForm />} />
      </Routes>
    </Router>
  );
};

export default App;
         