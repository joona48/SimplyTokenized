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
          <div className="mt-24 w-full flex flex-col items-center px-4">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-[525px] p-10">
              <h2 className="font-bold mb-3 text-xl lg:text-3xl">{title}</h2>
              <p className="text-base mb-6 text-gray-600">{subtitle}</p>
              {children}
            </div>
            <div className="px-6 text-center mt-4">
              <div className="text-sm text-gray-700 bg-gray-50 py-3 rounded-md">
                By continuing you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default AuthTemplate;