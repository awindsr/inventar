import React, { useState } from "react";
import { Product } from "@/types/productTypes";
import {  useRouter } from "next/navigation";
 // Assuming you're using Next.js

const AddProductPage: React.FC = () => {
  const router = useRouter();
  const [productData, setProductData] = useState<Product>({
    id: 0, // Placeholder, should be set appropriately
    name: "",
    market_price: 0,
    retail_price: 0,
    stockAvailable: 0,
    stock_available: 0,
    supplierName: "",
    productCode: "",
    category: "",
    image: "",
    images: [],
    subCategory: "",
    specifications: {
      brand: "",
      model: "",
      storage: "",
      ram: "",
      screenSize: "",
      colors: [],
      warranty: "",
      powerConsumption: "",
      dimensions: undefined,
      features: [],
    },
    details: {
      description: "",
      highlights: [],
      inBox: [],
    },
    variants: [],
    reviews: {
      averageRating: 0,
      totalReviews: 0,
    },
    metadata: {
      dateAdded: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      tags: [],
    },
    status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSpecificationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      specifications: { ...productData.specifications, [name]: value },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle product addition logic (e.g., API call)
    console.log("Product added:", productData);
    router.push("/products"); // Redirect to products page after submission
  };

  return (
    <div className="max-w-screen mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
        <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required className="mb-2 p-2 w-full" />
        <input type="number" name="market_price" placeholder="Market Price" onChange={handleChange} required className="mb-2 p-2 w-full" />
        <input type="number" name="retail_price" placeholder="Retail Price" onChange={handleChange} required className="mb-2 p-2 w-full" />
        <input type="number" name="stockAvailable" placeholder="Stock Available" onChange={handleChange} required className="mb-2 p-2 w-full" />
        <input type="number" name="stock_available" placeholder="Stock Available (duplicate)" onChange={handleChange} required className="mb-2 p-2 w-full" />
        <input type="text" name="supplierName" placeholder="Supplier Name" onChange={handleChange} required className="mb-2 p-2 w-full" />
        <input type="text" name="productCode" placeholder="Product Code" onChange={handleChange} required className="mb-2 p-2 w-full" />
        <input type="text" name="category" placeholder="Category" onChange={handleChange} required className="mb-2 p-2 w-full" />
        <input type="text" name="image" placeholder="Image URL" onChange={handleChange} required className="mb-2 p-2 w-full" />
        <input type="text" name="subCategory" placeholder="Sub Category" onChange={handleChange} required className="mb-2 p-2 w-full" />
        <input type="text" name="brand" placeholder="Brand" onChange={handleSpecificationsChange} className="mb-2 p-2 w-full" />
        <input type="text" name="model" placeholder="Model" onChange={handleSpecificationsChange} className="mb-2 p-2 w-full" />
        <input type="text" name="storage" placeholder="Storage" onChange={handleSpecificationsChange} className="mb-2 p-2 w-full" />
        <input type="text" name="ram" placeholder="RAM" onChange={handleSpecificationsChange} className="mb-2 p-2 w-full" />
        <input type="text" name="screenSize" placeholder="Screen Size" onChange={handleSpecificationsChange} className="mb-2 p-2 w-full" />
        <input type="text" name="warranty" placeholder="Warranty" onChange={handleSpecificationsChange} className="mb-2 p-2 w-full" />
        <button type="submit" className="bg-primary text-black font-semibold px-4 py-2 rounded-lg">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage; 