import React, { useState } from "react";
import { z } from "zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import CustomAuthLayout from "../Templates/CustomAuthLayout";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignInPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    setFirebaseError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = signInSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors = {};
      validation.error.errors.forEach((err) => {
        if (err.path && err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        const user = userCredential.user;
        const idToken = await user.getIdToken();

        console.log("Sign-in successful:", user.uid);
        console.log("ID Token:", idToken);

        // Redirect to dashboard
        navigate("/dashboard");
      } catch (error) {
        console.error("Firebase error:", error.message);
        setFirebaseError(error.message);
      }
    }
  };

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
      <form onSubmit={handleSubmit} className="text-left space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className={`w-full mt-1 p-2 border rounded-md focus:outline-none ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Password<span className="text-red-500">*</span>
          </label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className={`w-full mt-1 p-2 border rounded-md focus:outline-none ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {firebaseError && (
          <p className="text-red-500 text-sm mt-2">{firebaseError}</p>
        )}

        <div className="text-left text-sm text-blue-600 mt-2 mb-4 cursor-pointer">
          Forgot Password?
        </div>

        <button
          type="submit"
          className="w-full bg-[#0094d8] text-white py-2 rounded-md font-semibold cursor-pointer"
        >
          Login
        </button>
      </form>
    </CustomAuthLayout>
  );
}
