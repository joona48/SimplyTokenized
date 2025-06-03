import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";

import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";

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
        <Route path="/" element={<SignInPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;