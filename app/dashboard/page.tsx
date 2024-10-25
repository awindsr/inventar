"use client";
import { useSession } from "next-auth/react";
import Navbar from "@/components/navbar/Navbar";

export default function Dashboard() {
  const { data: session } = useSession();

//   console.log(session);

  return (
    <div className="min-h-screen bg-custom-gradient w-screen">
      <Navbar />
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {session?.user?.name}!
        </h1>
        {/* Add your dashboard content here */}
      </main>
    </div>
  );
}