import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EmailField = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  return (
    <div>
      <Label
        htmlFor="email"
        className="block text-sm font-semibold text-gray-800"
      >
        Email <span className="text-red-500">*</span>
      </Label>
      <Input
        id="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleChange}
        className={`mt-1 border-b pb-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors placeholder-gray-400 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        required
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default EmailField;