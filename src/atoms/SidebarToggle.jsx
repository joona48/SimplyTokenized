import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SidebarToggle = ({ isOpen, onToggle }) => {
  return (
    <Button variant="ghost" size="icon" onClick={onToggle}>
      {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </Button>
  );
};

export default SidebarToggle;
