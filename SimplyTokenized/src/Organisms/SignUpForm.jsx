import React from "react";
import NameFields from "../Molecules/NameFields";
import EmailField from "../Molecules/EmailField";
import PasswordFields from "../Molecules/PasswordFields";
import { Button } from "@/components/ui/button";

const SignUpForm = () => (
  <form className="flex flex-col space-y-6">
    <NameFields />
    <EmailField />
    <PasswordFields />
    <Button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Continue
    </Button>
  </form>
);

export default SignUpForm;