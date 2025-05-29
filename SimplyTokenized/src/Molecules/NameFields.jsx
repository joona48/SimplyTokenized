import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NameFields = () => (
  <div className="flex flex-wrap sm:flex-nowrap gap-4">
    <div className="w-full sm:w-1/2">
      <Label
        htmlFor="firstName"
        className="block text-sm font-semibold text-gray-800"
      >
        First Name <span className="text-red-500">*</span>
      </Label>
      <Input
        id="firstName"
        placeholder="First Name"
        className="mt-1 border-b border-gray-300 pb-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors placeholder-gray-400"
        required
      />
    </div>
    <div className="w-full sm:w-1/2">
      <Label
        htmlFor="lastName"
        className="block text-sm font-semibold text-gray-800"
      >
        Last Name <span className="text-red-500">*</span>
      </Label>
      <Input
        id="lastName"
        placeholder="Last Name"
        className="mt-1 border-b border-gray-300 pb-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors placeholder-gray-400"
        required
      />
    </div>
  </div>
);

export default NameFields;