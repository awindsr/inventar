"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddProductModal from "./AddProductModal"; // Import the modal component
import { Product } from "@/types/productTypes";

interface ProductsNavbarProps {
  onSearch: (query: string) => void; // Prop to handle search
  productCount: number; // Prop to display the number of products
}

export default function ProductsNavbar({ onSearch, productCount }: ProductsNavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Call the onSearch prop with the current query
  };

  const handleAddProduct = (product: Product) => {
    // Handle adding the product (e.g., send to API or update state)
    console.log("Product added:", product);
  };

  return (
    <div className="max-w-screen flex items-center justify-between font-raleway text-white mb-4">
      <div className="flex space-x-9 items-center justify-center">
        <div className="text-gray-400 border border-gray-600 px-2 py-1 rounded-full text-sm">
          {productCount} Products {/* Display the actual number of products */}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange} // Update search query on change
            className="bg-[#0f171a] px-4 py-2 rounded-full border border-gray-600 pl-10 w-[50vw]"
          />
          <span className="absolute left-3 top-2.5">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
          </span>
        </div>
      </div>
      <button
        className="flex items-center bg-primary text-black font-semibold px-4 py-2 rounded-lg justify-center transition duration-200"
        onClick={() => setIsModalOpen(true)} // Open modal on click
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add Product
      </button>
      <div className="absolute z-99 ">

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close modal
        onAddProduct={handleAddProduct} // Handle product addition
      />
      </div>
    </div>
  );
}
