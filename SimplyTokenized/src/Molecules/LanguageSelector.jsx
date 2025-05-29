import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const LanguageSelector = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-12 w-20 text-sm capitalize">
        {value.toUpperCase()}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">EN</SelectItem>
        <SelectItem value="de">DE</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
