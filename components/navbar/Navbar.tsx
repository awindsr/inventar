"use client";
import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faGauge, 
  faSignOut, 
  faUser, 
  faGear,
  faBell 
} from "@fortawesome/free-solid-svg-icons";
import NavButton from "../ui/NavButton";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [activeTab, setActiveTab] = React.useState("Dashboard");
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tabs = ["Dashboard", "Inventory", "Orders"];
  const { data: session } = useSession();

  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProfileOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="w-screen h-auto flex justify-between items-center p-4  relative z-50">
      {/* Logo Section */}
      <div className="flex items-end justify-center gap-2">
        <Image
          src="/logo.png"
          width={40}
          height={40}
          alt="inventar logo"
          className="object-contain"
        />
        <h1 className="text-white font-raleway font-bold text-2xl">inventar</h1>
      </div>

      {/* Navigation and Profile Section */}
      <div className="flex items-center gap-4">
        {/* Navigation Tabs */}
        {tabs.map((tab) => (
          <NavButton
            key={tab}
            icon={faGauge}
            isActive={activeTab === tab}
            onClick={() => handleClick(tab)}
          >
            {tab}
          </NavButton>
        ))}

        {/* Profile Section */}
        {session?.user?.image && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="relative flex items-center focus:outline-none group"
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
            >
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="h-9 w-9 rounded-full object-cover border-2 border-transparent group-hover:border-gray-500 transition-all duration-200"
                />
                {/* Online Status Indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-gray-900" />
              </div>
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transform opacity-100 scale-100 transition-all duration-200">
                {/* User Info Section */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-900">
                        {session.user.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {session.user.email}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <button
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => {/* Add profile handler */}}
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-3 h-4 w-4" />
                    Your Profile
                  </button>
                  
                  <button
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => {/* Add notifications handler */}}
                  >
                    <FontAwesomeIcon icon={faBell} className="mr-3 h-4 w-4" />
                    Notifications
                  </button>

                  <button
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => {/* Add settings handler */}}
                  >
                    <FontAwesomeIcon icon={faGear} className="mr-3 h-4 w-4" />
                    Settings
                  </button>
                </div>

                {/* Sign Out Button */}
                <div className="py-1 border-t border-gray-100">
                  <button
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    onClick={() => signOut()}
                  >
                    <FontAwesomeIcon icon={faSignOut} className="mr-3 h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}