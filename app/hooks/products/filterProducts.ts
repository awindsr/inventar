import { Product } from "@/types/productTypes";
import { useState, useEffect } from "react";

// Assuming products and filters are passed as props or defined in the component
interface FilterProductsProps {
  products: Product[]; // Array of products
  searchQuery: string; // Search query string
  filters: {
    status: string;
    productTypes: { value: string }[];
    selectedStock: string;
    selectedCategory: string;
    minPrice: string;
    maxPrice: string;
  };
}

const useFilterProducts = ({ products, searchQuery, filters }: FilterProductsProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const filterProducts = () => {
      const results = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filters.status === 'All' || product.status === filters.status;
        const matchesType = filters.productTypes.length === 0 || 
          filters.productTypes.some(type => type.value === product.subCategory);
        const matchesStock = filters.selectedStock === 'All Stocks' || 
          (filters.selectedStock === 'Low Stock' && product.stockAvailable < 20) || 
          (filters.selectedStock === 'In Stock' && product.stockAvailable > 0) || 
          (filters.selectedStock === 'High Stock' && product.stockAvailable > 100);
        const matchesCategory = filters.selectedCategory === 'All Products' || product.category === filters.selectedCategory;
        const matchesMinPrice = filters.minPrice === '' || product.retail_price >= parseFloat(filters.minPrice);
        const matchesMaxPrice = filters.maxPrice === '' || product.retail_price <= parseFloat(filters.maxPrice);

        return matchesSearch && matchesStatus && matchesType && matchesStock && matchesCategory && matchesMinPrice && matchesMaxPrice;
      });
      setFilteredProducts(results);
    };

    filterProducts();
  }, [products, searchQuery, filters]);

  return filteredProducts;
};

export default useFilterProducts;
