import React, { useState } from "react";
import LanguageSelector from "../Molecules/LanguageSelector";
import { Button } from "@/components/ui/button";

const HeaderBar = () => {
  const [language, setLanguage] = useState("en");

  return (
    <div className="flex flex-wrap justify-between items-center w-full absolute top-6 px-3 mb-10">
      {/* Logo */}
      <div className="hidden lg:block text-right">
        <img
          src="/Image/Simplyimage.png"
          alt="SimplyToken Logo"
          className="w-[242px] h-[45px] opacity-90"
        />
      </div>
      <div className="lg:hidden px-1 text-center">
        <img
          src="/Images/Simplyimage.png"
          alt="SimplyToken Logo"
          className="w-[50px] h-[45px] opacity-90"
        />
      </div>

      {/* Sign In & Language Selector */}
      <div className="text-right flex flex-col sm:flex-row items-end sm:items-center gap-3">
        <div className="flex items-center text-sm text-gray-600">
          Already a user?
          <Button
            variant="outline"
            className="ml-2 text-[#0086C9] border-[#0086C9] hover:bg-white"
          >
            Sign In
          </Button>
        </div>
        <LanguageSelector value={language} onChange={setLanguage} />
      </div>
    </div>
  );
};

export default HeaderBar;
