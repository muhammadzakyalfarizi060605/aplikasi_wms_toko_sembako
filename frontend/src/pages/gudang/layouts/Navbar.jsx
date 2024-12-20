import React, { useState } from "react";
import { HiUser } from "react-icons/hi";
import Swal from "sweetalert2"; // Impor SweetAlert
import { useNavigate } from "react-router-dom"; // Impor useNavigate

function Navbar({ toggleSidebar }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate(); // Inisialisasi useNavigate

  // Toggle dropdown menu user
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Fungsi untuk logout
  const handleLogout = () => {
    Swal.fire({
      title: "Anda yakin ingin logout?",
      text: "Semua sesi Anda akan diakhiri!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        // Logout logic (bisa ditambahkan logika seperti menghapus token)
        Swal.fire("Logout Berhasil", "Anda telah keluar.", "success");
        navigate("/"); // Navigasi ke halaman login
      }
    });
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
        {/* User Icon */}
        <button
          className="p-1 mx-4 rounded-full bg-white text-slate-950 hover:bg-gray-200"
          onClick={toggleUserMenu}
        >
          <HiUser className="w-6 h-6" />
        </button>
        {/* User Menu Dropdown */}
        {isUserMenuOpen && (
          <div className="absolute right-4 mt-4 w-48 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-400">
            <ul>
              <li
                className="px-4 py-2 cursor-pointer rounded-lg"
                onClick={handleLogout} // Tambahkan handleLogout di sini
              >
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
