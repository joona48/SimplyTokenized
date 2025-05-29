import React from "react";
import HeaderBar from "../Organisms/HeaderBar";

const AuthTemplate = ({ title, subtitle, children }) => (
  <div className="relative min-h-screen bg-gray-100 font-sans">
    <main className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <section aria-label="Notifications" />
        <div
          className="flex items-center justify-center min-h-screen w-full relative bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/bg.svg')" }}
        >
          <HeaderBar />
          <div className="mt-32 w-full flex flex-col items-center px-4">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-[525px] p-8">
              <h2 className="font-bold mb-2 text-xl lg:text-3xl">{title}</h2>
              <p className="text-sm mb-4 border-b pb-2">{subtitle}</p>
              {children}
            </div>
            <div className="px-6 text-center">
              <div className="text-sm mb-10">
                By continuing you agree to our <a href="#" className="text-blue-600">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default AuthTemplate;