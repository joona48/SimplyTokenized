import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PasswordFields = () => (
  <>
    <div>
      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" placeholder="Password" />
    </div>
    <div>
      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input id="confirmPassword" type="password" placeholder="Confirm Password" />
    </div>
  </>
);

export default PasswordFields;
