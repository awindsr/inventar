// components/products/ProductModal.tsx
import React, { useState } from "react";

interface ProductModalProps {
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
  onClose: () => void;
  onUpdate: (updatedProduct: any) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/products/${product.productCode}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedProduct),
        }
      );
      if (response.ok) {
        onUpdate(editedProduct); // Call the update function passed from the parent
        setIsEditing(false); // Close edit mode
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full h-full p-8 z-50">
      <div className="bg-[#141e22] rounded-lg p-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <h2 className="text-3xl font-semibold">{product.name}</h2>
            <div className="flex gap-7 text-gray-500">
              <p>{product.category}</p>
              <p>{product.supplierName}</p>
            </div>
          </div>
          <div>
            <p className="text-xl font-semibold"><span className="text-gray-500 font-medium">Total: </span>{product.stockAvailable} in Stock</p>
          </div>

          {isEditing ? (
            <button
              onClick={() => setIsEditing(false)}
              className="text-red-500">
              Close
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500">
              Edit
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white">Market Price</label>
              <input
                type="number"
                name="marketPrice"
                value={editedProduct.marketPrice}
                onChange={handleChange}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Retail Price</label>
              <input
                type="number"
                name="retailPrice"
                value={editedProduct.retailPrice}
                onChange={handleChange}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Stock Available</label>
              <input
                type="number"
                name="stockAvailable"
                value={editedProduct.stockAvailable}
                onChange={handleChange}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Supplier Name</label>
              <input
                type="text"
                name="supplierName"
                value={editedProduct.supplierName}
                onChange={handleChange}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Category</label>
              <input
                type="text"
                name="category"
                value={editedProduct.category}
                onChange={handleChange}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 rounded px-4 py-2">
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded px-4 py-2">
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="w-full h-full">
            <img src={product.image} className="w-[400px] h-[400px]" alt="" />
            <p className="text-white">
              Market Price: ${product.marketPrice.toFixed(2)}
            </p>
            <p className="text-white">
              Retail Price: ${product.retailPrice.toFixed(2)}
            </p>
            <p className="text-white">
              Stock Available: {product.stockAvailable}
            </p>
            <p className="text-white">Supplier Name: {product.supplierName}</p>
            <p className="text-white">Category: {product.category}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
