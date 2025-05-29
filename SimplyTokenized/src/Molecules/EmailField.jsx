import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EmailField = () => (
  <div>
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="Email" />
  </div>
);

export default EmailField;