"use client";

import {
  faShoppingBag,
  faBoxes,
  faDollarSign,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import StatBox from "@/components/dashboard/StatBox";
import { useSession } from "next-auth/react";
import useFetchDashboardProducts from "../api/products/useFetchDashboardDetails";
import PieChartWithCenterLabel from "@/components/dashboard/PieChartWithCenterLabel";

interface LinearGaugeProps {
  totalProduct: number;
  filledProducts: number;
  color: string;
}

const LinearGauge = ({ totalProduct, filledProducts, color }: LinearGaugeProps) => {
  const gaugeWidth = (filledProducts / totalProduct) * 100; // Calculate percentage filled

  return (
    <div className="w-full bg-gray-700 h-6 rounded-lg overflow-hidden">
      <div
        className="h-full"
        style={{ width: `${gaugeWidth}%`, backgroundColor: color }}></div>
    </div>
  );
};

export default function Dashboard() {
  const totalProduct:number = 1200;
  const filledProducts:number = 20;
  const { data: session } = useSession();
  const {
    totalProducts,
    totalStock,
    totalPriceValue,
    totalMoneySpent,
    lowStockCount,
    onStockCount,
    highStockCount,
  } = useFetchDashboardProducts() as {
    totalProducts: number;
    totalStock: number;
    totalPriceValue: number;
    totalMoneySpent: number;
    lowStockCount: number;
    onStockCount: number;
    highStockCount: number;
  };

  const stockData = [
    { value: lowStockCount, name: "Low Stock Items" },
    { value: onStockCount, name: "On Stock Items" },
    {
      value: highStockCount,
      name: "High Stock Items",
    },
  ];

  return (
    <div className="p-4">
      <div className="flex w-full justify-center items-center space-x-4">
        <StatBox
          numericValue={totalProducts}
          text="Total Products"
          icon={faShoppingBag}
        />
        <StatBox
          numericValue={totalStock}
          text="Total Stock Available"
          icon={faBoxes}
        />
        <StatBox
          numericValue={totalPriceValue}
          text="Total Price Value"
          icon={faDollarSign}
        />
        <StatBox
          numericValue={totalMoneySpent}
          text="Total Money Spent"
          icon={faMoneyBillWave}
        />
      </div>
      <div className="bg-[#1a262d] p-6 rounded-lg m-2 font-raleway w-full hover:shadow-lg">
        <p className="text-xl text-gray-400">Inventory Insights</p>
        <div className="flex items-center justify-center  gap-5">
       

          <PieChartWithCenterLabel data={stockData} />
       
          <div className="flex flex-col w-3/4">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Low Stock</h3>
              <LinearGauge
                totalProduct={totalProducts}
                filledProducts={lowStockCount}
                color="#facc15" // Yellow for low stock
              />
              <p className="mt-2 text-sm text-gray-600">
                {lowStockCount} out of {totalProducts} are low on stock
              </p>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">On Stock</h3>
              <LinearGauge
                totalProduct={totalProducts}
                filledProducts={onStockCount}
                color="#22c55e" // Green for on stock
              />
              <p className="mt-2 text-sm text-gray-600">
                {onStockCount} out of {totalProducts} are on stock
              </p>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">High Stock</h3>
              <LinearGauge
                totalProduct={totalProducts}
                filledProducts={highStockCount}
                color="#ef4444" // Red for high stock
              />
              <p className="mt-2 text-sm text-gray-600">
                {highStockCount} out of {totalProducts} are high on stock
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
