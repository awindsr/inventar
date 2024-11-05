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
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-custom-gradient w-screen h-screen">
      {status === "unauthenticated" && <SignIn />}
    </div>
  );
}