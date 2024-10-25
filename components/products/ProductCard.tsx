// components/products/ProductCard.tsx
import React from "react";

interface ProductCardProps {
  product: {
    name: string;
    marketPrice: number;
    retailPrice: number;
    stockAvailable: number;
    image: string;
    supplierName: string;
    productCode: string;
    category: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Determine stock status
  let stockStatus = "On Stock";
  if (product.stockAvailable < 20) {
    stockStatus = "Low Stock";
  } else if (product.stockAvailable > 100) {
    stockStatus = "High Stock";
  }

  return (
    <div className="bg-[#1a262d] rounded-lg shadow-md p-4 flex justify-between mb-4 w-full">
      <div className="flex space-x-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 object-cover rounded-md mb-2"
        />
        <div className="flex flex-col items-start justify-even ">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <div className="flex space-x-6">
            <p className="text-gray-600">Supplier: {product.supplierName}</p>
            <p className="text-gray-600">Category: {product.category}</p>
            <p
              className={`text-sm ${
                stockStatus === "Low Stock"
                  ? "text-red-500"
                  : stockStatus === "High Stock"
                  ? "text-green-500"
                  : "text-yellow-500"
              }`}>
             {stockStatus}
            </p>
          </div>
        </div>
      </div>
      <div className="flex space-x-8">

      <p className="text-gray-600 ">
        Retail Price<br/><span className="text-white font-2xl">${product.retailPrice.toFixed(2)}</span> 
      </p>
      <p className="text-gray-600">
        Market Price<br/> <span className="text-white font-2xl">${product.marketPrice.toFixed(2)}</span>
      </p>
      </div>
    </div>
  );
};

export default ProductCard;
