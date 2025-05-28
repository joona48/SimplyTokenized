import React from "react";
import AuthTemplate from "../Templates/AuthTemplate";
import SignUpForm from "../Organisms/SignUpForm";

const SignUpPage = () => (
  <AuthTemplate
    title="Sign Up"
    subtitle="Build and circulate your own custom token easily using our SimplyTokenized platform"
  >
    <SignUpForm />
  </AuthTemplate>
);

export default SignUpPage;