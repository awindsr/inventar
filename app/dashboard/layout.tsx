"use client"

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navbar from "@/components/navbar/Navbar";



export default function DashboardLayout({
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
    <>
      <div className='md:hidden  min-h-screen w-full bg-custom-gradient space-y-6 flex flex-col justify-center items-center'>
        <div className='flex flex-col '>
          <img src='/logo.png' alt='logo' className='w-20 h-20 mx-auto' />
          <p>
            <span className='text-4xl font-bold text-white font-raleway'>Inventar</span>
            <span className='text-4xl font-bold text-green-500 font-raleway'>.</span>
          </p>
        </div>
        <p className='text-xl font-light text-white font-raleway w-[50vw]'>
          Please use a desktop to access this app.
        </p>
      </div>
      
      <div className="hidden md:block min-h-screen bg-custom-gradient">
      <Navbar />
      <main className="p-8">
        {children}
      </main>
    </div>
    </>
  );
}