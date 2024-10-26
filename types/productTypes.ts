// types/productTypes.ts

export interface Color {
    name: string;
    hex: string;
    inStock: boolean;
  }
  
  export interface Feature {
    name: string;
    description: string;
  }
  
  export interface Dimensions {
    width: number;
    height: number;
    depth: number;
    unit: string;
  }
  
  export interface Variant {
    id: string;
    color?: string;
    storage?: string;
    price: number;
    stockAvailable: number;
  }
  
  export interface Product {
    name: string;
    marketPrice: number;
    retailPrice: number;
    stockAvailable: number;
    supplierName: string;
    productCode: string;
    category: string;
    image: string; 
    images: string[]; 
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
    status?: string;
  }
  
  export interface FilterOption {
    value: string;
    label: string;
  }
  
  export interface Filters {
    status: string;
    productTypes: FilterOption[];
    minPrice: string;
    maxPrice: string;
    selectedStock: string;
    selectedCategory: string;
  }