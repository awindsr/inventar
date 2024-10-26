"use client"
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faRotate,
  faDollarSign,
  faSort,
  faBoxes,
  faLayerGroup
} from "@fortawesome/free-solid-svg-icons";

interface FilterOption {
  label: string;
  count?: number;
  isActive?: boolean;
}
interface Filters {
  status: string;
  productTypes: FilterOption[];
  minPrice: string;
  maxPrice: string;
  selectedStock: string;
  selectedCategory: string;
}

interface ProductFilterProps {
  onFilterChange: (filters: Filters) => void; // Prop to handle filter changes
  onReset: () => void; // Prop to reset filters
}

export default function ProductFilter({ onFilterChange, onReset }: ProductFilterProps) {
  // Status options
  const [statusOptions] = useState<FilterOption[]>([
    { label: 'All', count: 1703, isActive: true },
    { label: 'Active', count: 1232, isActive: false },
    { label: 'Inactive', count: 250, isActive: false },
    { label: 'Draft', count: 36, isActive: false },
  ]);

  // Product type options
  const [productTypes, setProductTypes] = useState<FilterOption[]>([
    { label: 'Retail', isActive: false },
    { label: 'Wholesale', isActive: false },
  ]);

  const [selectedStatus, setSelectedStatus] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  
  // Accordion state
  const [openSections, setOpenSections] = useState({
    stock: false,
    category: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleStatusClick = (status: string) => {
    setSelectedStatus(status);
    onFilterChange({ status, productTypes, minPrice, maxPrice, selectedStock: 'All Stocks', selectedCategory: 'All Products' });
  };

  const handleReset = () => {
    setSelectedStatus('All');
    setProductTypes(prevTypes =>
      prevTypes.map(type => ({
        ...type,
        isActive: false
      }))
    );
    setMinPrice('');
    setMaxPrice('');
    setSelectedStock('All Stocks');
    setSelectedCategory('All Products');
    onReset(); // Call the reset function passed from parent
  };

  const handleProductTypeClick = (selectedType: string) => {
    setProductTypes(prevTypes =>
      prevTypes.map(type => ({
        ...type,
        isActive: type.label === selectedType
      }))
    );
    onFilterChange({ status: selectedStatus, productTypes, minPrice, maxPrice, selectedStock: 'All Stocks', selectedCategory: 'All Products' });
  };

  const handleStockClick = () => {
    toggleSection('stock');
    // Logic to handle stock alert click
    console.log('Stock alert clicked');
  };

  const handleCategoryClick = () => {
    toggleSection('category');
    // Logic to handle category click
    console.log('Category clicked');
  };

  const [stockOptions] = useState<string[]>(['All Stocks','Low Stock', 'In Stock', 'High Stock']); // Added stock options

  const handleStockOptionClick = (option: string) => {
    setSelectedStock(option);
    onFilterChange({ status: selectedStatus, productTypes, minPrice, maxPrice, selectedStock: option, selectedCategory: 'All Products' });
  };

  const [categoryOptions] = useState<string[]>(['All Products', 'Electronics', 'Home Appliances', 'Furniture', 'Clothing', 'Footwear', 'Toys', 'Books', 'Sports', 'Beauty', 'Health']); // Added category options

  const handleCategoryOptionClick = (category: string) => {
    setSelectedCategory(category);
    onFilterChange({ status: selectedStatus, productTypes, minPrice, maxPrice, selectedStock: 'All Stocks', selectedCategory: category });
  };

  const [sortOptions] = useState<string[]>([
    'Alphabetical: A-Z',
    'Alphabetical: Z-A',
    'Retail Price: Low to High',
    'Retail Price: High to Low',
    'Market Price: Low to High',
    'Market Price: High to Low',
    'Stock: Low to High',
    'Stock: High to Low',
  ]);

  const [openSortDropdown, setOpenSortDropdown] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]); // Default sort option

  const handleSortClick = () => {
    setOpenSortDropdown(prev => !prev);
  };

  const handleSortOptionClick = (option: string) => {
    setSelectedSort(option);
    setOpenSortDropdown(false); // Close the dropdown after selection
    console.log(`Selected sort option: ${option}`);
    // Logic to handle sorting of products can be added here
  };

  // State for selected options
  const [selectedStock, setSelectedStock] = useState<string>('All stock'); // Default selected stock
  const [selectedCategory, setSelectedCategory] = useState<string>('All product'); // Default selected category

  return (
    <div className="w-1/5 h-screen overflow-scroll flex flex-col justify-between bg-[#1a262d] text-white p-4 rounded-lg">
      {/* Product Status */}
      <div className="mb-6">
        <h3 className="text-sm text-gray-400 mb-3">PRODUCT STATUS</h3>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => handleStatusClick(option.label)}
              className={`flex items-center rounded-lg px-3 py-1 text-sm border 
                ${selectedStatus === option.label 
                  ? 'bg-[#202e36] border-primary text-white' 
                  : 'bg-[#1a262d] border-[#23323b] text-gray-300'}`}
            >
              <span>{option.label}</span>
              <span className="ml-2 text-xs">{option.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Product Type */}
      <div className="mb-6">
        <h3 className="text-sm text-gray-400 mb-3">PRODUCT TYPE</h3>
        <div className="flex gap-2">
          {productTypes.map((type) => (
            <button
              key={type.label}
              onClick={() => handleProductTypeClick(type.label)}
              className={`flex items-center rounded-lg px-4 py-2 text-sm border
                ${type.isActive 
                  ? 'bg-[#202e36] border-primary text-white' 
                  : 'bg-[#1a262d] border-[#23323b] text-gray-300'}`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <h3 className="text-sm text-gray-400 mb-3">SORT BY</h3>
        <button 
          onClick={handleSortClick} // Updated to handle click
          className="w-full bg-gray-800 text-gray-300 rounded-lg px-4 py-2 flex items-center justify-between"
        >
          <div className="flex items-center">
            <FontAwesomeIcon icon={faSort} className="w-4 h-4 mr-2" />
            <span className="text-sm">{selectedSort}</span> {/* Display selected sort option */}
          </div>
          <FontAwesomeIcon icon={faChevronDown} className={`w-4 h-4 transform transition-transform ${openSortDropdown ? 'rotate-180' : ''}`} />
        </button>
        {openSortDropdown && ( // Render dropdown options if the section is open
          <div className="mt-2 bg-gray-700 rounded-lg p-2">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleSortOptionClick(option)} // Handle sort option click
                className="w-full text-left text-gray-300 hover:bg-gray-600 rounded-lg px-2 py-1"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Stock Alert */}
      <div className="mb-6">
        <button 
          onClick={handleStockClick} // Updated to handle click
          className="w-full bg-gray-800 text-gray-300 rounded-lg px-4 py-2 flex items-center justify-between"
        >
          <div className="flex items-center">
            <FontAwesomeIcon icon={faBoxes} className="w-4 h-4 mr-2" />
            <span className="text-sm">{selectedStock}</span> {/* Display selected stock option */}
          </div>
          <FontAwesomeIcon 
            icon={faChevronDown}
            className={`w-4 h-4 transform transition-transform ${openSections.stock ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.stock && ( // Render dropdown options if the section is open
          <div className="mt-2 bg-gray-700 rounded-lg p-2">
            {stockOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleStockOptionClick(option)} // Handle stock option click
                className="w-full text-left text-gray-300 hover:bg-gray-600 rounded-lg px-2 py-1"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Category */}
      <div className="mb-6">
        <button 
          onClick={handleCategoryClick} // Updated to handle click
          className="w-full bg-gray-800 text-gray-300 rounded-lg px-4 py-2 flex items-center justify-between"
        >
          <div className="flex items-center">
            <FontAwesomeIcon icon={faLayerGroup} className="w-4 h-4 mr-2" />
            <span className="text-sm">{selectedCategory}</span> {/* Display selected category */}
          </div>
          <FontAwesomeIcon 
            icon={faChevronDown}
            className={`w-4 h-4 transform transition-transform ${openSections.category ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.category && ( // Render dropdown options if the section is open
          <div className="mt-2 bg-gray-700 rounded-lg p-2">
            {categoryOptions.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryOptionClick(category)} // Handle category option click
                className="w-full text-left text-gray-300 hover:bg-gray-600 rounded-lg px-2 py-1"
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-sm text-gray-400 mb-3">PRICE</h3>
        <div className="space-y-2">
          <div className="relative">
            <FontAwesomeIcon 
              icon={faDollarSign} 
              className="absolute left-3 top-3 text-gray-400 w-4 h-4" 
            />
            <input
              type="number"
              placeholder="Minimum price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full bg-gray-800 text-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm placeholder-gray-500"
            />
          </div>
          <div className="relative">
            <FontAwesomeIcon 
              icon={faDollarSign} 
              className="absolute left-3 top-3 text-gray-400 w-4 h-4" 
            />
            <input
              type="number"
              placeholder="Maximum price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full bg-gray-800 text-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={handleReset} // This will now reset all filters
        className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <FontAwesomeIcon icon={faRotate} className="w-4 h-4" />
        <span className="text-sm">Reset Filters</span>
      </button>
    </div>
  );
}
