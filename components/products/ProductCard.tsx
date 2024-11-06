// components/products/ProductCard.tsx
import type React from "react";
import type { Product } from '../../types/productTypes';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import useDeleteProduct from "@/app/api/products/useDeleteProduct";





interface ProductCardProps {
  product: Product;
  refetch: () => void;
 
  
}


const ProductCard: React.FC<ProductCardProps> = ({ product, refetch}) => {
  const { deleteProduct } = useDeleteProduct();

  const handleDeleteClick = async (
    productCode: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation(); // Prevents the parent component's onClick from being triggered
    console.log(`Attempting to delete product with code: ${productCode}`);
    
    try {
      await deleteProduct(product.product_code);
      console.log(`Deleted product with code: ${product.product_code}`);
      refetch();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again."); // Optional user feedback
    }
  };

  // Determine stock status
  let stockStatus = "On Stock";
  if (product.stockAvailable < 20) {
    stockStatus = "Low Stock";
  } else if (product.stockAvailable > 100) {
    stockStatus = "High Stock";
  }
  const defaultImage = '/image-placeholder.png';

  return (
    <div className="bg-[#1a262d] rounded-lg shadow-md p-4 flex justify-between mb-4 w-full">
      <div className="flex space-x-4">
        <img
          src={product.images[0]}
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
      <div className="flex space-x-8 justify-start">
        

      <p className="text-gray-600 ">
        Retail Price<br/><span className="text-white font-2xl">${product.retail_price.toFixed(2)}</span> 
      </p>
      <p className="text-gray-600">
        Market Price<br/> <span className="text-white font-2xl">${product.market_price.toFixed(2)}</span>
      </p>
      <button type="button" className="px-4 py-2 text-red-500" onClick={(e) => handleDeleteClick(product.productCode, e)}>
              <FontAwesomeIcon icon={faTrash} />
      </button>
      </div>
    </div>
  );
};

export default ProductCard;
