import ProductsFilter from '@/components/products/ProductsFilter'
import ProductsList from '@/components/products/ProductsList'
import ProductsNavbar from '@/components/products/ProductsNavbar'
import React from 'react'

export default function page() {
  return (
    <div className='min-h-screen flex flex-col'>
        <div>
        <ProductsNavbar/>
        </div>
        <div className='flex items-start justify-between space-x-4 w-full h-full'>
            <ProductsFilter/>
            <ProductsList/>

        </div>

    </div>
  )
}
