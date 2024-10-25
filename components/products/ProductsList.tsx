"use client"
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

export default function ProductsList() {
  const [products, setProducts] = useState<any[]>([]); // State to hold products
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [selectedProduct, setSelectedProduct] = useState<any>(null); // State for selected product
  const productsPerPage = 10; // Number of products to display per page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products'); // Fetch products from JSON server
        const data = await response.json();
        setProducts(data); // Set products to state
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProducts(); // Call the fetch function
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>; // Loading state
  }

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Slice products for the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle product click to open modal
  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
  };

  // Handle product update
  const handleUpdateProduct = (updatedProduct: any) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.productCode === updatedProduct.productCode ? updatedProduct : product
      )
    );
  };

  return (
    <div className='w-full min-h-screen rounded-lg '>
      <h2 className="text-white text-2xl mb-4">Products List</h2>
      <div className="flex flex-col w-full">
        {currentProducts.map(product => (
          <div key={product.productCode} onClick={() => handleProductClick(product)}>
            <ProductCard product={product} /> {/* Render ProductCard for each product */}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onUpdate={handleUpdateProduct} 
        />
      )}
    </div>
  );
}
