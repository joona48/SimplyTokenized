import React, { useState } from "react";
import LanguageSelector from "../Molecules/LanguageSelector";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeaderBar = ({ prompt, buttonLabel, buttonLink }) => {
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();

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
          src="/Image/Simplyimage.png"
          alt="SimplyToken Logo"
          className="w-[50px] h-[45px] opacity-90"
        />
      </div>

      {/* Right section */}
      <div className="text-right flex flex-col sm:flex-row items-end sm:items-center gap-3">
        <div className="flex items-center text-sm text-gray-600">
          {prompt}
          <Button
            variant="outline"
            onClick={() => navigate(buttonLink)}
            className="ml-2 text-[#0086C9] border-[#0086C9] hover:bg-white"
          >
            {buttonLabel}
          </Button>
        </div>
        <LanguageSelector value={language} onChange={setLanguage} />
      </div>
    </div>
  );
};

export default HeaderBar;
