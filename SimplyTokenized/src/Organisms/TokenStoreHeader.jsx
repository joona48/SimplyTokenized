// src/Organisms/TokenStoreHeader.jsx
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TokenStoreHeader = () => {
  return (
    <div className="flex items-center justify-end w-full h-12">
      <Avatar className="w-8 h-8">
        <AvatarImage src="/avatars/01.png" alt="@user" />
        <AvatarFallback>R</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default TokenStoreHeader;
