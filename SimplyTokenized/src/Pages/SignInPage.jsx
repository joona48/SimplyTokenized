import React from "react";
import CustomAuthLayout from "../Templates/CustomAuthLayout";

export default function SignInPage() {
  return (
    <CustomAuthLayout
      title="Sign In"
      subtitle="Welcome back to build your Own custom tokens"
      footer={
        <>
          <a href="#">Impress</a>
          <span>•</span>
          <a href="#">Data Protection</a>
          <span>•</span>
          <a href="#">Contact</a>
        </>
      }
    >
      <div className="text-left space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 focus:ring-offset-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Password<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 focus:ring-offset-white"
          />
        </div>

        <div className="text-left text-sm text-blue-600 mt-2 mb-4 cursor-pointer">
          Forgot Password?
        </div>

        <button className="w-full bg-[#0094d8] text-white py-2 rounded-md font-semibold">
          Login
        </button>
      </div>
    </CustomAuthLayout>
  );
}
