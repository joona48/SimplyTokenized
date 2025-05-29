import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage"; // <-- Import SignInPage

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} /> {/* Redirect to SignIn */}
        <Route path="/signin" element={<SignInPage />} />              {/* SignIn route */}
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
};

export default App;
