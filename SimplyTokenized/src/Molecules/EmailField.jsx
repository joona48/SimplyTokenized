import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EmailField = ({ register, errors }) => (
  <div>
    <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
    <Input
      id="email"
      type="email"
      {...register("email")}
      placeholder="Email"
      className="mt-1 border-b pb-2"
    />
    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
  </div>
);

export default EmailField;
