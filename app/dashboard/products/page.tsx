
"use client"
import ProductsList from '@/components/products/ProductsList'
import React from 'react'



export default function page() {
  return (
    <div className='min-h-screen flex flex-col'>
        <div className='flex items-start justify-between space-x-4 w-full h-full'>
            <ProductsList/>
        </div>

    </div>
  )
}
