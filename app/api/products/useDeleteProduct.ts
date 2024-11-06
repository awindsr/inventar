import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const useDeleteProduct = () => {
    const deleteProduct = async (id: string) => {
        try {
            const { error } = await supabase.from("products").delete().eq("product_code", id);
            if (error) throw new Error(error.message);
        } catch (error) {
            console.error("Failed to delete product:", error);
            throw error; 
        }
    };
    
    return { deleteProduct };
};

export default useDeleteProduct;
