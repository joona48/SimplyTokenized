import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "../Molecules/LanguageSelector";
import { Button } from "@/components/ui/button";

// Encoded SVG background (keep your existing full string here)
const svgBackground = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1400' height='909' viewBox='0 0 1400 909' fill='none'%3E%3Cg filter='url(%23filter0_f_15_40)'%3E%3Ccircle cx='371' cy='371' r='371' transform='matrix(-0.99999 -0.00454475 -0.00454475 0.99999 477.682 144.19)' fill='url(%23paint0_linear_15_40)' fill-opacity='0.1'/%3E%3C/g%3E%3Cg filter='url(%23filter1_f_15_40)'%3E%3Ccircle cx='241.721' cy='241.721' r='241.721' transform='matrix(-0.99999 -0.00454475 -0.00454475 0.99999 710.816 -290.924)' fill='url(%23paint1_linear_15_40)' fill-opacity='0.1'/%3E%3C/g%3E%3Cg filter='url(%23filter2_f_15_40)'%3E%3Ccircle cx='331.385' cy='331.385' r='331.385' transform='matrix(-0.99999 -0.00454475 -0.00454475 0.99999 1742.83 -38.0806)' fill='url(%23paint2_linear_15_40)' fill-opacity='0.06'/%3E%3C/g%3E%3Cg filter='url(%23filter3_f_15_40)'%3E%3Ccircle cx='1400' cy='716.795' r='189.255' transform='rotate(179.74 1400 716.795)' fill='url(%23paint3_linear_15_40)' fill-opacity='0.3'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_f_15_40' x='-269' y='139.5' width='748' height='748' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='1.5' result='effect1_foregroundBlur_15_40'/%3E%3C/filter%3E%3Cfilter id='filter1_f_15_40' x='223.279' y='-295.025' width='489.441' height='489.441' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='1.5' result='effect1_foregroundBlur_15_40'/%3E%3C/filter%3E%3Cfilter id='filter2_f_15_40' x='1076.56' y='-41.5902' width='666.771' height='666.771' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='1' result='effect1_foregroundBlur_15_40'/%3E%3C/filter%3E%3Cfilter id='filter3_f_15_40' x='1208.74' y='525.54' width='382.51' height='382.51' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='1' result='effect1_foregroundBlur_15_40'/%3E%3C/filter%3E%3ClinearGradient id='paint0_linear_15_40' x1='371' y1='0' x2='371' y2='742' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'/%3E%3Cstop offset='1' stop-color='%2313D0E3'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_15_40' x1='241.721' y1='0' x2='241.721' y2='483.441' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'/%3E%3Cstop offset='1' stop-color='%2313E34B'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint2_linear_15_40' x1='331.385' y1='0' x2='331.385' y2='662.771' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'/%3E%3Cstop offset='1' stop-color='%23A113E3'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint3_linear_15_40' x1='1400' y1='527.54' x2='1400' y2='906.05' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23B5C7F4'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E")`;


const AuthTemplate = ({ title, subtitle, children }) => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");

  return (
    <div className="relative min-h-screen bg-gray-100 font-sans">
      <main className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <section aria-label="Notifications" />
          <div
            className="flex items-center justify-center min-h-screen w-full relative bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: svgBackground }}
          >
            {/* Custom Header */}
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

              {/* "Already a user?" and Language Selector */}
              <div className="text-right flex flex-col sm:flex-row items-end sm:items-center gap-3">
                <div className="flex items-center text-sm text-gray-600">
                  Already a user?
                  <Button
                    variant="outline"
                    className="ml-2 text-[#0086C9] border-[#0086C9] hover:bg-white"
                    onClick={() => navigate("/signin")}
                  >
                    Sign In
                  </Button>
                </div>
                <LanguageSelector value={language} onChange={setLanguage} />
              </div>
            </div>

            {/* Auth Box */}
            <div className="mt-24 w-full flex flex-col items-center px-4">
              <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-[525px] p-10">
                <h2 className="font-bold mb-3 text-xl lg:text-3xl">{title}</h2>
                <p className="text-base mb-6 text-gray-600">{subtitle}</p>
                {children}
              </div>
              <div className="px-6 text-center mt-4">
                <div className="text-sm text-gray-700 bg-gray-50 py-3 rounded-md">
                  By continuing you agree to our{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthTemplate;
