"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ProductsNavbar() {
  return (
    <div className="max-w-screen flex items-center justify-between font-raleway text-white mb-4">
      <div className="flex space-x-9 items-center justify-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <div className="text-gray-400 border border-gray-600 px-2 py-1 rounded-full text-sm">
          1609 Products
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="bg-[#0f171a] px-4 py-2 rounded-full border border-gray-600 pl-10 w-[50vw]"
          />
          <span className="absolute left-3 top-2.5">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
          </span>
        </div>
      </div>
      <button className="flex items-center bg-primary text-black font-semibold px-4 py-2 rounded-lg justify-center  transition duration-200">
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add Product
      </button>
    </div>
  );
}
