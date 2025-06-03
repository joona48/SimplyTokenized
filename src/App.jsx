import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FireblocksForm from "./Pages/FireblocksForm";
import TokenStore from "./Pages/TokenStore"; // Make sure this is imported

const App = () => {
  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((response) => console.log(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TokenStore />} />
        <Route path="/token-store" element={<TokenStore />} />
        <Route path="/fireblocks-form" element={<FireblocksForm />} />
      </Routes>
    </Router>
  );
};

export default App;
