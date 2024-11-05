import { useState, useEffect, useCallback } from 'react';
import { createClient } from '../../../utils/supabase/client';
import { Product } from '../../../types/productTypes'; // Import the Product type

const supabase = createClient(); // Moved Supabase client creation outside the component

const useFetchProducts = (userEmail: string) => {
  const [products, setProducts] = useState<Product[]>([]); // Specify the type of products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Specify the type for error

  const fetchProducts = useCallback(async () => {
    try {
      const { data: organisationData, error: organisationError } = await supabase
        .from('users')
        .select('organization_id')
        .eq('email', userEmail)
        .single();

      if (organisationError) throw organisationError;

      const organizationID = organisationData?.organization_id;

      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('organization_id', organizationID);

      if (productsError) throw productsError;

      setProducts(productsData as Product[]); // Assert the type of productsData
    } catch (error) {
      console.error('Error fetching products:', error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    if (userEmail) {
      fetchProducts();
    }
  }, [userEmail, fetchProducts]);

  return { products, loading, error, refetch: fetchProducts }; // Expose refetch method
};

export default useFetchProducts;
