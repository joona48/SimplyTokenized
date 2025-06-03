// File: src/pages/SignUpPage.jsx
import React from "react";
import AuthTemplate from "../Templates/AuthTemplate";
import SignUpForm from "../Organisms/SignUpForm";

const SignUpPage = () => (
  <div className="h-screen overflow-y-auto">
    <AuthTemplate
      title="Sign Up"
      subtitle="Build and circulate your own custom token easily using our SimplyTokenized platform"
    >
      <SignUpForm />
      <div className="text-sm mt-6 text-center">
        By continuing you agree to our{" "}
        <a href="#" className="text-blue-600">
          Terms of Service
        </a>
      </div>
    </AuthTemplate>
  </div>
);

export default SignUpPage;
