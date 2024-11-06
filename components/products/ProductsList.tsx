"use client";
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import ProductsNavbar from './ProductsNavbar';
import ProductFilter from './ProductsFilter';
import type { Product, Filters } from '../../types/productTypes';
import { useSession } from 'next-auth/react';
import useFetchProducts from '../../app/api/products/useFetchProducts';
import useFilterProducts from '../../app/api/products/filterProducts';

interface ProductFilterProps {
  onFilterChange: (filters: Filters) => void;
  onReset: () => void;
}


interface ProductCardProps {
  product: Product;
  handleDelete: () => void;
}

export default function ProductsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const productsPerPage = 10;

  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  // Use the custom hook to fetch products
  const { products, loading, error, refetch } = useFetchProducts(userEmail || '');

  const [filters, setFilters] = useState<Filters>({
    status: 'All',
    productTypes: [],
    minPrice: '',
    maxPrice: '',
    selectedStock: 'All Stocks',
    selectedCategory: 'All Products',
  });

  const filteredProducts = useFilterProducts({ products, searchQuery, filters });

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
 

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  // Handle updating a product without modifying other state during rendering
  const handleUpdateProduct = (updatedProduct) => {
    setSelectedProduct(null);
    refetch(); // Triggers a fresh fetch after product update
  };

  const handleFilterChange = (filters: Filters) => {
    setFilters(filters);
  };

  const handleResetFilters = () => {
    setFilters({
      status: 'All',
      productTypes: [], 
      minPrice: '',
      maxPrice: '',
      selectedStock: 'All Stocks',
      selectedCategory: 'All Products',
    });
  };


  return (
    <div className='w-full min-h-screen rounded-lg flex gap-8'>
      {/* <ProductFilter 
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters} 
      /> */}
      <div className='flex-1'>
        <ProductsNavbar onSearch={setSearchQuery} productCount={filteredProducts.length} />
        <h2 className="text-white text-2xl mb-4">Products List</h2>
        <div className="flex flex-col w-full">
          {currentProducts.map(product => (
          <div key={product.productCode} onClick={() => handleProductClick(product)}>
              <ProductCard product={product} refetch={refetch} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              type='button'
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onUpdate={handleUpdateProduct} 
          />
        )}
      </div>
    </div>
  );
}
