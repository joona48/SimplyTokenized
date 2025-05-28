import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NameFields = () => (
  <div className="flex flex-wrap sm:flex-nowrap gap-4">
    <div className="w-full sm:w-1/2">
      <Label htmlFor="firstName">First Name</Label>
      <Input id="firstName" placeholder="First Name" />
    </div>
    <div className="w-full sm:w-1/2">
      <Label htmlFor="lastName">Last Name</Label>
      <Input id="lastName" placeholder="Last Name" />
    </div>
  </div>
);

export default NameFields;
