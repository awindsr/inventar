"use client";
import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faSignOut,
  faUser,
  faGear,
  faBell,
  faBox,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import NavButton from "../ui/NavButton";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);

  const navigationTabs = [
    { name: "Dashboard", path: "/dashboard", icon: faGauge },
    { name: "Inventory", path: "/dashboard/products", icon: faBox },
    { name: "Orders", path: "/dashboard/orders", icon: faShoppingCart },
  ];

  const { data: session } = useSession();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const isActiveTab = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") {
      return true;
    }
    if (path !== "/dashboard" && pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen, isNotificationOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
        setIsNotificationOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const notifications = [
    { id: 1, message: "New order received", date: "2 minutes ago" },
    { id: 2, message: "Inventory low for item XYZ", date: "10 minutes ago" },
    { id: 3, message: "User John has sent a message", date: "30 minutes ago" },
  ];

  return (
    <div className="w-screen h-auto flex justify-between items-center p-4 relative z-50">
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
        {navigationTabs.map((tab) => (
          <NavButton
            key={tab.name}
            icon={tab.icon}
            isActive={isActiveTab(tab.path)}
            onClick={() => handleNavigate(tab.path)}>
            {tab.name}
          </NavButton>
        ))}

        {/* Rest of the code remains the same... */}
        {/* Profile Section */}
        {session?.user?.image && (
          <div className="relative" ref={notificationDropdownRef}>
            <button
            type="button"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="notification-btn">
              <FontAwesomeIcon icon={faBell} />
            </button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transform opacity-100 scale-100 transition-all duration-200">
                <div className="py-1">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <span>{notification.message}</span>
                        <span className="text-xs text-gray-500">
                          {notification.date}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="relative" ref={userDropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="relative flex items-center focus:outline-none group"
            aria-expanded={isProfileOpen}
            type="button"
            aria-haspopup="true">
            {/* Profile Image */}
            <div className="relative">
              
              <img
                src={session?.user?.image ?? "/default-profile.png"}
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
                    src={session?.user?.image ?? "/default-profile.png"}
                    alt="Profile"
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">
                      {session?.user?.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {session?.user?.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button
                type="button"
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => router.push("/dashboard/profile")}>
                  <FontAwesomeIcon icon={faUser} className="mr-3 h-4 w-4" />
                  Your Profile
                </button>

                <button
                type="button"
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsNotificationOpen(true)}>
                  <FontAwesomeIcon icon={faBell} className="mr-3 h-4 w-4" />
                  Notifications
                </button>

                <button
                type="button"
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => router.push("/dashboard/settings")}>
                  <FontAwesomeIcon icon={faGear} className="mr-3 h-4 w-4" />
                  Settings
                </button>
              </div>

              {/* Sign Out Button */}
              <div className="py-1 border-t border-gray-100">
                <button
                type="button"
                  className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  onClick={() => signOut()}>
                  <FontAwesomeIcon icon={faSignOut} className="mr-3 h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
