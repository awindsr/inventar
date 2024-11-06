"use client"

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';



export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {  status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect('/');
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-custom-gradient">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-custom-gradient">
      <main className="p-8">
        {children}
      </main>
    </div>
  );
}