import React, { useState } from "react";
import { Tab } from "@headlessui/react";

interface Color {
  name: string;
  hex: string;
  inStock: boolean;
}

interface Feature {
  name: string;
  description: string;
}

interface Dimensions {
  width: number;
  height: number;
  depth: number;
  unit: string;
}

interface Variant {
  id: string;
  color?: string;
  storage?: string;
  price: number;
  stockAvailable: number;
}

interface ProductModalProps {
  product: {
    name: string;
    marketPrice: number;
    retailPrice: number;
    stockAvailable: number;
    images: string[];
    supplierName: string;
    productCode: string;
    category: string;
    subCategory: string;
    specifications: {
      brand?: string;
      model?: string;
      storage?: string;
      ram?: string;
      screenSize?: string;
      colors: Color[];
      warranty: string;
      powerConsumption?: string;
      dimensions?: Dimensions;
      features?: Feature[];
    };
    details: {
      description: string;
      highlights: string[];
      inBox: string[];
    };
    variants: Variant[];
    reviews: {
      averageRating: number;
      totalReviews: number;
    };
    metadata: {
      dateAdded: string;
      lastUpdated: string;
      tags: string[];
    };
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/products/${product.productCode}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProduct),
      });
      if (response.ok) {
        onUpdate(editedProduct); // Call the update function passed from the parent
        setIsEditing(false); // Close edit mode
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const addImage = () => {
    if (newImageUrl) {
      setEditedProduct(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl],
      }));
      setNewImageUrl(""); // Clear the input field
    }
  };

  const deleteImage = (index: number) => {
    setEditedProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const updateImage = (index: number) => {
    const updatedImages = [...editedProduct.images];
    updatedImages[index] = newImageUrl; // Update the image URL
    setEditedProduct(prev => ({
      ...prev,
      images: updatedImages,
    }));
    setNewImageUrl(""); // Clear the input field
  };

  const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < fullStars
                ? 'text-yellow-400'
                : i === fullStars && hasHalfStar
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-gray-400">
          ({product.reviews.totalReviews} reviews)
        </span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full h-full p-4 z-50">
      <div className="bg-[#141e22] rounded-lg p-6 w-full max-w-7xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <div className="flex gap-3">

            {isEditing ? (
              <>
               
                <button onClick={() => setIsEditing(false)} className="text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition-all px-2 py-1 rounded-lg">Cancel Edit</button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition-all px-2 py-1 rounded-lg ">Edit</button>
            )}
             <button onClick={onClose} className="text-red-500 mr-4 border border-red-500 hover:bg-red-500 hover:text-white transition-all px-2 py-1 rounded-lg">Close</button>
          </div>
         
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white">Product Name</label>
              <input
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleChange}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
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
            <div className="mb-4">
              <label className="block text-white">Subcategory</label>
              <input
                type="text"
                name="subCategory"
                value={editedProduct.subCategory}
                onChange={handleChange}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Description</label>
              <textarea
                name="description"
                value={editedProduct.details.description}
                onChange={handleChange}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Highlights (comma separated)</label>
              <textarea
                name="highlights"
                value={editedProduct.details.highlights.join(', ')}
                onChange={(e) => handleChange({ target: { name: 'highlights', value: e.target.value.split(', ') } })}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">In The Box (comma separated)</label>
              <textarea
                name="inBox"
                value={editedProduct.details.inBox.join(', ')}
                onChange={(e) => handleChange({ target: { name: 'inBox', value: e.target.value.split(', ') } })}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Brand</label>
              <input
                type="text"
                name="brand"
                value={editedProduct.specifications.brand}
                onChange={handleChange}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Model</label>
              <input
                type="text"
                name="model"
                value={editedProduct.specifications.model}
                onChange={handleChange}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Storage</label>
              <input
                type="text"
                name="storage"
                value={editedProduct.specifications.storage}
                onChange={handleChange}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">RAM</label>
              <input
                type="text"
                name="ram"
                value={editedProduct.specifications.ram}
                onChange={handleChange}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Screen Size</label>
              <input
                type="text"
                name="screenSize"
                value={editedProduct.specifications.screenSize}
                onChange={handleChange}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Warranty</label>
              <input
                type="text"
                name="warranty"
                value={editedProduct.specifications.warranty}
                onChange={handleChange}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Power Consumption</label>
              <input
                type="text"
                name="powerConsumption"
                value={editedProduct.specifications.powerConsumption}
                onChange={handleChange}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Dimensions (Width, Height, Depth, Unit)</label>
              <input
                type="text"
                name="dimensions"
                value={`${editedProduct.specifications.dimensions?.width || ''}, ${editedProduct.specifications.dimensions?.height || ''}, ${editedProduct.specifications.dimensions?.depth || ''}, ${editedProduct.specifications.dimensions?.unit || ''}`}
                onChange={(e) => {
                  const [width, height, depth, unit] = e.target.value.split(', ');
                  setEditedProduct(prev => ({
                    ...prev,
                    specifications: {
                      ...prev.specifications,
                      dimensions: { width: Number(width), height: Number(height), depth: Number(depth), unit }
                    }
                  }));
                }}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Features (comma separated)</label>
              <textarea
                name="features"
                value={editedProduct.specifications.features?.map(f => `${f.name}: ${f.description}`).join(', ')}
                onChange={(e) => {
                  const featuresArray = e.target.value.split(', ').map(f => {
                    const [name, description] = f.split(': ');
                    return { name, description };
                  });
                  setEditedProduct(prev => ({
                    ...prev,
                    specifications: {
                      ...prev.specifications,
                      features: featuresArray
                    }
                  }));
                }}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Add Image URL</label>
              <input
                type="text"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
              <button type="button" onClick={addImage} className="mt-2 bg-blue-500 text-white rounded px-4 py-2">Add Image</button>
            </div>

            <div className="mb-4">
              <h4 className="text-white font-semibold">Current Images</h4>
              <ul className="list-disc list-inside text-gray-400">
                {editedProduct.images.map((image, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{image}</span>
                    <div>
                      <button type="button" onClick={() => deleteImage(index)} className="text-red-500">Delete</button>
                      <button type="button" onClick={() => updateImage(index)} className="text-blue-500 ml-2">Update</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={onClose} className="bg-gray-300 rounded px-4 py-2">Cancel</button>
              <button type="submit" className="bg-green-500 text-white rounded px-4 py-2">Save</button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Images and Basic Info */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={`${product.name} - View ${selectedImageIndex + 1}`}
                  className="w-full h-[400px] object-contain bg-[#0f171a] rounded-lg"
                />
              </div>

              {/* Image Thumbnails */}
              <div className="flex gap-2 overflow-x-auto py-2">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-20 h-20 object-cover cursor-pointer rounded-sm 
                      ${selectedImageIndex === index ? 'border-2 border-blue-500' : 'border border-gray-600'}`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>

              {/* Basic Information */}
              <div className="bg-[#1a282e] p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Pricing & Availability</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Market Price:</span>
                    <span className="text-white">${product.marketPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Retail Price:</span>
                    <span className="text-green-500 font-semibold">${product.retailPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Stock Available:</span>
                    <span className="text-white">{product.stockAvailable} units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Supplier:</span>
                    <span className="text-white">{product.supplierName}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Details and Specifications */}
            <div className="space-y-6">
              {/* Rating */}
              <div className="mb-4">
                <StarRating rating={product.reviews.averageRating} />
              </div>

              {/* Tabs for Different Sections */}
              <Tab.Group>
                <Tab.List className="flex space-x-1 bg-[#1a282e] p-1 rounded-lg">
                  <Tab className={({ selected }) => `w-full py-2 text-sm font-medium text-center rounded-lg ${selected ? 'bg-blue-500 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>Description</Tab>
                  <Tab className={({ selected }) => `w-full py-2 text-sm font-medium text-center rounded-lg ${selected ? 'bg-blue-500 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>Specifications</Tab>
                  <Tab className={({ selected }) => `w-full py-2 text-sm font-medium text-center rounded-lg ${selected ? 'bg-blue-500 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>Variants</Tab>
                </Tab.List>

                <Tab.Panels className="mt-4">
                  {/* Description Panel */}
                  <Tab.Panel className="bg-[#1a282e] p-4 rounded-lg">
                    <div>
                      <h4 className="text-white font-semibold mb-2">Description</h4>
                      <p className="text-gray-400">{product.details.description}</p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Highlights</h4>
                      <ul className="list-disc list-inside text-gray-400">
                        {product.details.highlights.map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">In The Box</h4>
                      <ul className="list-disc list-inside text-gray-400">
                        {product.details.inBox.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </Tab.Panel>

                  {/* Specifications Panel */}
                  <Tab.Panel className="bg-[#1a282e] p-4 rounded-lg">
                    <div className="space-y-4">
                      {Object.entries(product.specifications).map(([key, value]) => {
                        if (key === 'colors') {
                          return (
                            <div key={key}>
                              <h4 className="text-white font-semibold mb-2">Colors</h4>
                              <div className="flex gap-2">
                                {value.map((color: Color) => (
                                  <div
                                    key={color.name}
                                    className="flex items-center gap-2 bg-[#243238] p-2 rounded-lg"
                                  >
                                    <div
                                      className="w-4 h-4 rounded-full"
                                      style={{ backgroundColor: color.hex }}
                                    />
                                    <span className="text-gray-400">{color.name}</span>
                                    <span className={color.inStock ? 'text-green-500' : 'text-red-500'}>
                                      {color.inStock ? '✓' : '×'}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        }
                        if (key === 'dimensions') {
                          const dim = value as Dimensions;
                          return (
                            <div key={key}>
                              <h4 className="text-white font-semibold mb-2">Dimensions</h4>
                              <p className="text-gray-400">
                                {`${dim.width}${dim.unit} × ${dim.height}${dim.unit} × ${dim.depth}${dim.unit}`}
                              </p>
                            </div>
                          );
                        }
                        if (key === 'features') {
                          return (
                            <div key={key}>
                              <h4 className="text-white font-semibold mb-2">Features</h4>
                              <div className="space-y-2">
                                {(value as Feature[]).map((feature) => (
                                  <div key={feature.name} className="bg-[#243238] p-2 rounded-lg">
                                    <h5 className="text-white">{feature.name}</h5>
                                    <p className="text-gray-400">{feature.description}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        }
                        return (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-400">
                              {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </span>
                            <span className="text-white">{value as string}</span>
                          </div>
                        );
                      })}
                    </div>
                  </Tab.Panel>

                  {/* Variants Panel */}
                  <Tab.Panel className="bg-[#1a282e] p-4 rounded-lg">
                    <div className="space-y-4">
                      {product.variants.map((variant) => (
                        <div
                          key={variant.id}
                          className={`p-4 rounded-lg cursor-pointer ${
                            selectedVariant.id === variant.id
                              ? 'bg-blue-500'
                              : 'bg-[#243238] hover:bg-[#2a3b42]'
                          }`}
                          onClick={() => setSelectedVariant(variant)}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-white font-semibold">
                                {variant.color && `${variant.color}`}
                                {variant.storage && ` - ${variant.storage}`}
                              </h4>
                              <p className="text-gray-400">
                                Stock: {variant.stockAvailable} units
                              </p>
                            </div>
                            <div className="text-white font-semibold">
                              ${variant.price.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
