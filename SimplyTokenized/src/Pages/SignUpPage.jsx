import React from "react";
import AuthTemplate from "../Templates/AuthTemplate";
import SignUpForm from "../Organisms/SignUpForm";

const SignUpPage = () => (
  <div className="relative h-screen overflow-y-auto">
    <AuthTemplate
      title="Sign Up"
      subtitle="Build and circulate your own custom token easily using our SimplyTokenized platform"
      titleClassName="aut-font-bold aut-mb-2 aut-text-left aut-text-xl lg:aut-text-3xl"
    >
      <div className="pb-12">
        <SignUpForm />
      </div>
    </AuthTemplate>
  </div>
);

export default SignUpPage;