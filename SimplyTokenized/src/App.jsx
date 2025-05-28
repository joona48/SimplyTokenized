import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import SignUpPage from "./Pages/SignUpPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
};

export default App; // ✅ This line is required
