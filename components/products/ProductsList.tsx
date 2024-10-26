"use client"
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import ProductsNavbar from './ProductsNavbar';
import ProductFilter from './ProductsFilter';
import type { Product, Filters } from '../../types/productTypes';
import { createClient } from '../../utils/supabase/client'; // Import the Supabase client

const supabase = createClient(); // Initialize the Supabase client

interface ProductFilterProps {
  onFilterChange: (filters: Filters) => void; // Ensure this matches
  onReset: () => void;
}



export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const productsPerPage = 10;

  const [filters, setFilters] = useState<Filters>({
    status: 'All',
    productTypes: [], // Let TypeScript infer the type from the Filters interface
    minPrice: '',
    maxPrice: '',
    selectedStock: 'All Stocks',
    selectedCategory: 'All Products',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products') // Replace with your actual table name
          .select('*');

        if (error) throw error; // Handle error if any

        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log(products)

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status === 'All' || product.status === filters.status;
    const matchesType = filters.productTypes.length === 0 || 
      filters.productTypes.some(type => type.value === product.subCategory);
    const matchesStock = filters.selectedStock === 'All Stocks' || 
      (filters.selectedStock === 'Low Stock' && product.stockAvailable < 20) || 
      (filters.selectedStock === 'In Stock' && product.stockAvailable > 0) || 
      (filters.selectedStock === 'High Stock' && product.stockAvailable > 100);
    const matchesCategory = filters.selectedCategory === 'All Products' || product.category === filters.selectedCategory;
    const matchesMinPrice = filters.minPrice === '' || product.retailPrice >= parseFloat(filters.minPrice);
    const matchesMaxPrice = filters.maxPrice === '' || product.retailPrice <= parseFloat(filters.maxPrice);

    return matchesSearch && matchesStatus && matchesType && matchesStock && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.productCode === updatedProduct.productCode ? updatedProduct : product
      )
    );
  };

  // Use the imported Filters type
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const handleFilterChange: (filters : any) => void = (filters) => {
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
    {/*@ts-ignore*/}
     
<ProductFilter 
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters} 
      />
      <div className='flex-1'>
        <ProductsNavbar onSearch={setSearchQuery} productCount={products.length} />
        <h2 className="text-white text-2xl mb-4">Products List</h2>
        <div className="flex flex-col w-full">
          {currentProducts.map(product => (
            <div key={product.productCode} onClick={() => handleProductClick(product)}>
              <ProductCard product={product} />
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
