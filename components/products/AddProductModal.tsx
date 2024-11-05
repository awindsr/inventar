import React, { useState } from "react";
import { Product } from "@/types/productTypes";
import { createClient } from "@/utils/supabase/client"; // Adjust the import based on your project structure

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
}

const supabase = createClient();

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onAddProduct }) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate form data
    if (!productData.name) {
      alert("Please enter a product name.");
      return;
    }
  
    if (!productData.supplierName) {
      alert("Please enter a supplier name.");
      return;
    }
  
    if (!productData.productCode) {
      alert("Please enter a product code.");
      return;
    }
  
    if (!productData.category) {
      alert("Please select a category.");
      return;
    }
  
    if (!productData.subCategory) {
      alert("Please select a subcategory.");
      return;
    }
  
    if (!productData.image) {
      alert("Please upload an image for the product.");
      return;
    }
  
    try {
      // Prepare data for Supabase
      const { data, error, status } = await supabase
        .from("products")
        .insert([
          {
            name: productData.name,
            market_price: productData.market_price,
            retail_price: productData.retail_price,
            stock_available: productData.stock_available,
            supplier_name: productData.supplierName,
            product_code: productData.productCode,
            category: productData.category,
            sub_category: productData.subCategory,
            image: productData.image,
            images: productData.images,
            specifications: productData.specifications,
            details: productData.details,
            variants: productData.variants,
            reviews: productData.reviews,
            metadata: productData.metadata,
            status: productData.status,
            organization_id: 1, // Replace with actual organization ID
          },
        ]);
  
      // Check the status and handle the result accordingly
      if (status === 201) {
        console.log("Product added:", data);
        alert("Product added successfully!"); // Show success message
        onAddProduct(productData); // Call the parent function to update the state
        onClose(); // Close the modal after submission
      } else if (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product. Please try again.");
      } else {
        throw new Error("Unexpected response from Supabase");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-[80vw] max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-white">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex space-x-4">
              <input
                type="number"
                name="market_price"
                placeholder="Market Price"
                onChange={handleChange}
                required
                className="flex-1 p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="number"
                name="retail_price"
                placeholder="Retail Price"
                onChange={handleChange}
                required
                className="flex-1 p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="number"
                name="stockAvailable"
                placeholder="Stock Available"
                onChange={handleChange}
                required
                className="flex-1 p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
             
            </div>
            <input
              type="text"
              name="supplierName"
              placeholder="Supplier Name"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              name="productCode"
              placeholder="Product Code"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              name="subCategory"
              placeholder="Sub Category"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex space-x-4">
              <input
                type="text"
                name="brand"
                placeholder="Brand"
                onChange={handleSpecificationsChange}
                className="flex-1 p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                name="model"
                placeholder="Model"
                onChange={handleSpecificationsChange}
                className="flex-1 p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="text"
                name="storage"
                placeholder="Storage"
                onChange={handleSpecificationsChange}
                className="flex-1 p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                name="ram"
                placeholder="RAM"
                onChange={handleSpecificationsChange}
                className="flex-1 p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="text"
                name="screenSize"
                placeholder="Screen Size"
                onChange={handleSpecificationsChange}
                className="flex-1 p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                name="warranty"
                placeholder="Warranty"
                onChange={handleSpecificationsChange}
                className="flex-1 p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button type="submit" className="bg-primary text-black font-semibold px-4 py-2 rounded-lg transition duration-200 hover:bg-opacity-80">
              Add Product
            </button>
            <button type="button" onClick={onClose} className="bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200 hover:bg-gray-500">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal; 