import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NameFields = ({ register, errors }) => (
  <div className="flex flex-wrap sm:flex-nowrap gap-4">
    <div className="w-full sm:w-1/2">
      <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
      <Input
        id="firstName"
        {...register("firstName")}
        placeholder="First Name"
        className="mt-1 border-b pb-2"
      />
      {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
    </div>
    <div className="w-full sm:w-1/2">
      <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
      <Input
        id="lastName"
        {...register("lastName")}
        placeholder="Last Name"
        className="mt-1 border-b pb-2"
      />
      {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
    </div>
  </div>
);

export default NameFields;
