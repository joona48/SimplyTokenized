import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase"; //  Ensure db is exported from firebase.js
import { doc, setDoc } from "firebase/firestore"; 

import NameFields from "../Molecules/NameFields";
import EmailField from "../Molecules/EmailField";
import PasswordFields from "../Molecules/PasswordFields";
import { Button } from "@/components/ui/button";

// ✅ Zod schema
const schema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include uppercase letter")
      .regex(/[0-9]/, "Must include a number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      // ✅ Save additional user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        createdAt: new Date().toISOString(),
      });

      alert("Signup successful!");
    } catch (error) {
      console.error("Signup failed:", error.message);
      alert(`Signup failed: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
      <NameFields register={register} errors={errors} />
      <EmailField register={register} errors={errors} />
      <PasswordFields register={register} errors={errors} />
      <Button type="submit" className="w-full bg-blue-600 text-white">
        Continue
      </Button>
    </form>
  );
};

export default SignUpForm;
