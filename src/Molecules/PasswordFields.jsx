import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PasswordFields = ({ register, errors }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="relative">
        <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          placeholder="Password"
          className="mt-1 border-b pb-2"
        />
        <button
          type="button"
          onClick={() => setShowPassword((p) => !p)}
          className="absolute right-2 top-9 text-gray-500 text-sm"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>
      <div className="relative">
        <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
        <Input
          id="confirmPassword"
          type={showConfirm ? "text" : "password"}
          {...register("confirmPassword")}
          placeholder="Confirm Password"
          className="mt-1 border-b pb-2"
        />
        <button
          type="button"
          onClick={() => setShowConfirm((p) => !p)}
          className="absolute right-2 top-9 text-gray-500 text-sm"
        >
          {showConfirm ? "Hide" : "Show"}
        </button>
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
      </div>
    </div>
  );
};

export default PasswordFields;
