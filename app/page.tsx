"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {SignIn}  from "@/components/ui/SignIn";

export default function Home() {
  const {  status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return  <div className="min-h-screen flex items-center justify-center bg-custom-gradient">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
  </div>
  }

  return (
    <div className="bg-custom-gradient w-screen h-screen">
      {status === "unauthenticated" && <SignIn />}
    </div>
  );
}