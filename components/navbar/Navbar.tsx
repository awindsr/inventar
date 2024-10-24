"use client"
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge } from "@fortawesome/free-solid-svg-icons";
import NavButton from "../ui/NavButton";
import Image from "next/image";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Dashboard"); // Track the active tab
  const tabs = ["Dashboard", "Inventory", "Orders"];

  // Define the handleClick function to set the active tab
  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-screen h-auto flex justify-between items-center p-4">
      <div className="flex items-end justify-center gap-2">
        <Image src={"/logo.png"} width={40} height={40} alt="inventar logo" />
        <h1 className="text-white font-raleway font-bold text-2xl">inventar</h1>
      </div>
      <div className="flex gap-4">
        {tabs.map((tab) => (
          <NavButton
            key={tab} // Move key to NavButton
            icon={faGauge}
            isActive={activeTab === tab}
            onClick={() => handleClick(tab)} // Pass handleClick directly here
          >
            {tab}
          </NavButton>
        ))}
      </div>
    </div>
  );
}
