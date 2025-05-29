import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PasswordFields = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-6">
      <div className="relative">
        <Label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-800"
        >
          Password <span className="text-red-500">*</span>
        </Label>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="mt-1 border-b border-gray-300 pb-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors placeholder-gray-400"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-9 text-gray-500 text-sm"
        >
          
        </button>
      </div>
      <div className="relative">
        <Label
          htmlFor="confirmPassword"
          className="block text-sm font-semibold text-gray-800"
        >
          Confirm Password <span className="text-red-500">*</span>
        </Label>
        <Input
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          className="mt-1 border-b border-gray-300 pb-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors placeholder-gray-400"
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-2 top-9 text-gray-500 text-sm"
        >
          
        </button>
      </div>
    </div>
  );
};

export default PasswordFields;