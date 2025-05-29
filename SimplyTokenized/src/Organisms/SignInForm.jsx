import React from "react";
import EmailField from "../Molecules/EmailField";
import PasswordFields from "../Molecules/PasswordFields";
import { Button } from "@/components/ui/button";

const SignInForm = () => (
  <form className="flex flex-col space-y-4">
    <EmailField />
    <PasswordFields />
    <Button type="submit" className="w-full">Login</Button>
  </form>
);

export default SignInForm;