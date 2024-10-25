// /components/SignIn.js
"use client";

import { signIn } from "next-auth/react";

export function SignIn() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg">
        <h2 className="mb-6 text-2xl font-semibold text-center">Sign In</h2>
        <button
          onClick={() => signIn("google")}
          className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
}
