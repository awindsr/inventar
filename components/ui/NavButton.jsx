"use client";

import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NavButton({ children, icon, isActive, onClick }) {
  return (
    <button
      type="button"
      className={`border border-[#19323c] ${
        isActive ? "bg-[#19323c]" : "bg-[#0e2026]"
      } flex items-center justify-center rounded-full px-4 py-2 hover:bg-[#19323c] font-raleway`}
      onClick={onClick} // Use the onClick function passed from the parent
      aria-pressed={isActive}
    >
      <FontAwesomeIcon 
        icon={icon} 
        className={`mr-2 ${isActive ? "text-primary" : "text-gray-400"}`} 
      />
      {children}
    </button>
  );
}
