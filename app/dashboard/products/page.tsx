
"use client"
import ProductsList from '@/components/products/ProductsList'
import React from 'react'
import { useSession } from 'next-auth/react';


export default function page() {
  const { status } = useSession();
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-custom-gradient">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
    </div>
    );
  }
  return (
    <div className='min-h-screen flex flex-col'>
        <div className='flex items-start justify-between space-x-4 w-full h-full'>
            <ProductsList/>
        </div>

    </div>
  )
}
