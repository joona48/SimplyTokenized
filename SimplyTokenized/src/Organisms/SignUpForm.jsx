import React from "react";
import NameFields from "../Molecules/NameFields";
import EmailField from "../Molecules/EmailField";
import PasswordFields from "../Molecules/PasswordFields";
import { Button } from "@/components/ui/button";

const SignUpForm = () => (
  <form className="flex flex-col space-y-4">
    <NameFields />
    <EmailField />
    <PasswordFields />
    <Button type="submit" className="w-full">Continue</Button>
  </form>
);

export default SignUpForm;