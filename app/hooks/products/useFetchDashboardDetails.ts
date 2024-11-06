import useFetchProducts from "./useFetchProducts";
import { useSession } from "next-auth/react";
import { Product } from '../../../types/productTypes'; // Import the Product type

const useFetchDashboardProducts = () => {
    const { data: session } = useSession();
    const userEmail = session?.user?.email;
    const { products, loading, error, refetch } = useFetchProducts(userEmail || '');

    // Ensure TypeScript knows products is an array of Product
    const {
        totalStock,
        totalPriceValue,
        totalMoneySpent,
        lowStockCount,
        onStockCount,
        highStockCount,
    } = products.reduce<{
        totalStock: number;
        totalPriceValue: number;
        totalMoneySpent: number;
        lowStockCount: number;
        onStockCount: number;
        highStockCount: number;
    }>(
        (totals, product: Product) => { // Explicitly type product as Product
            // Calculate totals for stock, price, and money spent
            totals.totalStock += product.stock_available;
            totals.totalPriceValue += product.retail_price * product.stock_available;
            totals.totalMoneySpent += product.stock_available * product.market_price;

            // Determine stock status and increment the corresponding count
            if (product.stock_available < 20) {
                totals.lowStockCount += 1;
            } else if (product.stock_available > 50) {
                totals.onStockCount += 1;
            } else {
                totals.highStockCount += 1;
            }

            return totals;
        },
        {
            totalStock: 0,
            totalPriceValue: 0,
            totalMoneySpent: 0,
            lowStockCount: 0,
            onStockCount: 0,
            highStockCount: 0,
        }
    );

    return {
        totalProducts: products.length,
        totalStock,
        totalPriceValue,
        totalMoneySpent,
        lowStockCount,
        onStockCount,
        highStockCount,
    };
};

export default useFetchDashboardProducts;
