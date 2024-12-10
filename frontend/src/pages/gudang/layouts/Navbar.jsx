import React, { useState } from "react";
// Import ikon HiUser dari Heroicons
import { HiUser } from "react-icons/hi";
{
  /* Impor ikon HiUser dari react-icons/hi */
}

function Navbar({ toggleSidebar }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Toggle dropdown menu user
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-[#FF8000] to-yellow-400 text-white flex justify-between items-center p-2">
      <div>
        {/* Hamburger Menu */}
        <button
          className="text-xl font-bold text-white p-2 rounded-lg hover:bg-slate-50 hover:text-black"
          onClick={toggleSidebar}
        >
          ☰
        </button>
      </div>
      <div className="relative">
        {/* User Icon with Circle from Flowbite's HiUser */}
        <button
          className="p-1 mx-4 rounded-full bg-white text-slate-950 hover:bg-gray-200"
          onClick={toggleUserMenu}
        >
          <HiUser className="w-6 h-6" />
        </button>
        {/* User Menu Dropdown */}
        {isUserMenuOpen && (
          <div className="absolute right-4 mt-4 w-48 bg-white text-black rounded-lg shadow-lg">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-lg">
                Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-lg">
                Settings
              </li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-lg">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
