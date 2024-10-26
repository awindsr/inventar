import type React from "react";
import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import type { Product, Color, Feature, Dimensions } from '../../types/productTypes';
import { createClient } from '../../utils/supabase/client'; // Import the Supabase client
const supabase = createClient(); // Create an instance of the Supabase client

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onUpdate: (updatedProduct: Product) => void; 
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product>(product); // Initialize with current product values
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [newImageUrl, setNewImageUrl] = useState("");

  // Update editedProduct when product prop changes
  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Check if the field is 'highlights' to handle it differently
    if (name === "highlights") {
      setEditedProduct((prev) => ({
        ...prev,
        details: {
          ...prev.details,
          highlights: value.split(",").map((highlight) => highlight.trim()), // Split and trim the highlights
        },
      }));
    } else if (name === "inBox") {
      setEditedProduct((prev) => ({
        ...prev,
        details: {
          ...prev.details,
          inBox: value.split(",").map((item) => item.trim()), // Split and trim the inBox items
        },
      }));
    } else {
      setEditedProduct((prev) => ({
        ...prev,
        [name]: value, // Update the state with the new value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update the product in Supabase
    const { data, error } = await supabase
        .from('products') // Replace 'products' with your actual table name
        .update(editedProduct) // Update with the edited product data
        .eq('id', product.id); // Assuming 'id' is the primary key for the product

    if (error) {
        console.error('Error updating product:', error);
    } else {
        onUpdate(editedProduct); // Pass the updated product to the parent component
    }
  };
  const defaultImage = '/image-placeholder.png';

console.log(Image)
  const addImage = () => {
    if (newImageUrl) {
      setEditedProduct((prev) => ({
        ...prev,
        images: [...prev.images, newImageUrl],
      }));
      setNewImageUrl(""); // Clear the input field
    }
  };

  const deleteImage = (index: number) => {
    setEditedProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const updateImage = (index: number) => {
    const updatedImages = [...editedProduct.images];
    updatedImages[index] = newImageUrl; // Update the image URL
    setEditedProduct((prev) => ({
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
          // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
          <svg
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={i}
            className={`w-5 h-5 ${
              i < fullStars
                ? "text-yellow-400"
                : i === fullStars && hasHalfStar
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20">
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
                <button
                type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition-all px-2 py-1 rounded-lg">
                  Cancel Edit
                </button>
              </>
            ) : (
              <button
              type="button"
                onClick={() => setIsEditing(true)}
                className="text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition-all px-2 py-1 rounded-lg ">
                Edit
              </button>
            )}
            <button
            type="button"
              onClick={onClose}
              className="text-red-500 mr-4 border border-red-500 hover:bg-red-500 hover:text-white transition-all px-2 py-1 rounded-lg">
              Close
            </button>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="productName" className="block text-white">Product Name</label>
              <input
                id="productName"
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleChange}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="marketPrice" className="block text-white">Market Price</label>
              <input
                id="marketPrice"
                type="number"
                name="marketPrice"
                value={editedProduct.market_price} // Bind to editedProduct state
                onChange={handleChange} // Update state on change
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="retailPrice" className="block text-white">Retail Price</label>
              <input
                id="retailPrice"
                type="number"
                name="retailPrice"
                value={editedProduct.retail_price} // Bind to editedProduct state
                onChange={handleChange} // Update state on change
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="stockAvailable" className="block text-white">Stock Available</label>
              <input
                id="stockAvailable"
                type="number"
                name="stockAvailable"
                value={editedProduct.stockAvailable} // Bind to editedProduct state
                onChange={handleChange} // Update state on change
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="supplierName" className="block text-white">Supplier Name</label>
              <input
                id="supplierName"
                type="text"
                name="supplierName"
                value={editedProduct.supplierName} // Bind to editedProduct state
                onChange={handleChange} // Update state on change
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-white">Category</label>
              <input
                type="text"
                name="category"
                value={editedProduct.category}
                onChange={handleChange}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subCategory" className="block text-white">Subcategory</label>
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
              <label className="block text-white">
                Highlights (comma separated)
              </label>
              <textarea
                name="highlights"
                value={editedProduct.details.highlights.join(", ")} // Join the highlights for display
                onChange={handleChange} // Use the modified handleChange
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">
                In The Box (comma separated)
              </label>
              <textarea
                name="inBox"
                value={editedProduct.details.inBox.join(", ")} // Join the inBox items for display
                onChange={handleChange} // Use the modified handleChange
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
              <label className="block text-white">
                Dimensions (Width, Height, Depth, Unit)
              </label>
              <input
                type="text"
                name="dimensions"
                value={`${
                  editedProduct.specifications.dimensions?.width || ""
                }, ${editedProduct.specifications.dimensions?.height || ""}, ${
                  editedProduct.specifications.dimensions?.depth || ""
                }, ${editedProduct.specifications.dimensions?.unit || ""}`}
                onChange={(e) => {
                  const [width, height, depth, unit] =
                    e.target.value.split(", ");
                  setEditedProduct((prev) => ({
                    ...prev,
                    specifications: {
                      ...prev.specifications,
                      dimensions: {
                        width: Number(width),
                        height: Number(height),
                        depth: Number(depth),
                        unit,
                      },
                    },
                  }));
                }}
                className="border rounded w-full p-2 bg-[#0f171a] border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">
                Features (comma separated)
              </label>
              <textarea
                name="features"
                value={editedProduct.specifications.features
                  ?.map((f) => `${f.name}: ${f.description}`)
                  .join(", ")}
                onChange={(e) => {
                  const featuresArray = e.target.value.split(", ").map((f) => {
                    const [name, description] = f.split(": ");
                    return { name, description };
                  });
                  setEditedProduct((prev) => ({
                    ...prev,
                    specifications: {
                      ...prev.specifications,
                      features: featuresArray,
                    },
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
              <button
                type="button"
                onClick={addImage}
                className="mt-2 bg-blue-500 text-white rounded px-4 py-2">
                Add Image
              </button>
            </div>

            <div className="mb-4">
              <h4 className="text-white font-semibold">Current Images</h4>
              <ul className="list-disc list-inside text-gray-400">
                {editedProduct.images.map((image, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{image}</span>
                    <div>
                      <button
                        type="button"
                        onClick={() => deleteImage(index)}
                        className="text-red-500">
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => updateImage(index)}
                        className="text-blue-500 ml-2">
                        Update
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
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
                className="bg-green-500 text-white rounded px-4 py-2">
                Save
              </button>
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
                      ${
                        selectedImageIndex === index
                          ? "border-2 border-blue-500"
                          : "border border-gray-600"
                      }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>

              {/* Basic Information */}
              <div className="bg-[#1a282e] p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Pricing & Availability
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Market Price:</span>
                    <span className="text-white">
                      ${product.market_price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Retail Price:</span>
                    <span className="text-green-500 font-semibold">
                      ${product.retail_price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Stock Available:</span>
                    <span className="text-white">
                      {product.stockAvailable} units
                    </span>
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
                  <Tab
                    className={({ selected }) =>
                      `w-full py-2 text-sm font-medium text-center rounded-lg ${
                        selected
                          ? "bg-blue-500 text-white"
                          : "text-gray-400 hover:bg-gray-700"
                      }`
                    }>
                    Description
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      `w-full py-2 text-sm font-medium text-center rounded-lg ${
                        selected
                          ? "bg-blue-500 text-white"
                          : "text-gray-400 hover:bg-gray-700"
                      }`
                    }>
                    Specifications
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      `w-full py-2 text-sm font-medium text-center rounded-lg ${
                        selected
                          ? "bg-blue-500 text-white"
                          : "text-gray-400 hover:bg-gray-700"
                      }`
                    }>
                    Variants
                  </Tab>
                </Tab.List>

                <Tab.Panels className="mt-4">
                  {/* Description Panel */}
                  <Tab.Panel className="bg-[#1a282e] p-4 rounded-lg">
                    <div>
                      <h4 className="text-white font-semibold mb-2">
                        Description
                      </h4>
                      <p className="text-gray-400">
                        {product.details.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">
                        Highlights
                      </h4>
                      <ul className="list-disc list-inside text-gray-400">
                        {product.details.highlights.map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">
                        In The Box
                      </h4>
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
                      {Object.entries(product.specifications).map(
                        ([key, value]) => {
                          // Handle colors
                          if (key === "colors" && Array.isArray(value)) {
                            return (
                              <div key={key}>
                                <h4 className="text-white font-semibold mb-2">
                                  Colors
                                </h4>
                                <div className="flex gap-2">
                                  {value.map((color) => {
                                    const colorValue = color as Color; // Type assertion to Color
                                    return (
                                      <div
                                        key={colorValue.name}
                                        className="flex items-center gap-2 bg-[#243238] p-2 rounded-lg">
                                        <div
                                          className="w-4 h-4 rounded-full"
                                          style={{
                                            backgroundColor: colorValue.hex,
                                          }}
                                        />
                                        <span className="text-gray-400">
                                          {colorValue.name}
                                        </span>
                                        <span
                                          className={
                                            colorValue.inStock
                                              ? "text-green-500"
                                              : "text-red-500"
                                          }>
                                          {colorValue.inStock ? "✓" : "×"}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          }

                          // Handle features
                          if (key === "features" && Array.isArray(value)) {
                            return (
                              <div key={key}>
                                <h4 className="text-white font-semibold mb-2">
                                  Features
                                </h4>
                                <div className="space-y-2">
                                  {value.map((feature) => {
                                    const featureValue = feature as Feature; // Type assertion to Feature
                                    return (
                                      <div
                                        key={featureValue.name}
                                        className="bg-[#243238] p-2 rounded-lg">
                                        <h5 className="text-white">
                                          {featureValue.name}
                                        </h5>
                                        <p className="text-gray-400">
                                          {featureValue.description}
                                        </p>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          }

                          // Handle other keys...
                          if (key === "dimensions") {
                            const dim = value as Dimensions; // Assuming value is Dimensions
                            return (
                              <div key={key}>
                                <h4 className="text-white font-semibold mb-2">
                                  Dimensions
                                </h4>
                                <p className="text-gray-400">
                                  {`${dim.width}${dim.unit} × ${dim.height}${dim.unit} × ${dim.depth}${dim.unit}`}
                                </p>
                              </div>
                            );
                          }
                          return (
                            <div key={key} className="flex justify-between">
                              <span className="text-gray-400">
                                {key.charAt(0).toUpperCase() + key.slice(1)}:
                              </span>
                              <span className="text-white">
                                {value as string}
                              </span>
                            </div>
                          );
                        }
                      )}
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
                              ? "bg-blue-500"
                              : "bg-[#243238] hover:bg-[#2a3b42]"
                          }`}
                          onClick={() => setSelectedVariant(variant)}>
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
