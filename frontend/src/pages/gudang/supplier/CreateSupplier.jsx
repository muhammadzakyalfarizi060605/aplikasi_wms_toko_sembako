import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Swal from "sweetalert2"; // Import SweetAlert2
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

const AddSupplier = () => {
  const [supplier, setSupplier] = useState({
    nama_supplier: "",
    email: "",
    no_telp: "",
    alamat: "",
  });

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/suppliers", supplier);
      // Show SweetAlert2 success message
      Swal.fire({
        icon: "success",
        title: "Supplier Berhasil Ditambahkan",
        text: "Supplier baru telah berhasil ditambahkan.",
      });
      navigate("/gudang/supplier/dashboard"); // Navigate back to the dashboard after successful submission
    } catch (error) {
      console.error("Error adding supplier:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <main className="flex-1 p-4">
          <div className="bg-white p-6 shadow-lg rounded-lg mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Tambah Supplier
            </h1>
          </div>

          {/* Supplier Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nama Supplier
              </label>
              <input
                type="text"
                name="nama_supplier"
                value={supplier.nama_supplier}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={supplier.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                No. Telp
              </label>
              <input
                type="text"
                name="no_telp"
                value={supplier.no_telp}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Alamat
              </label>
              <textarea
                name="alamat"
                value={supplier.alamat}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Simpan Supplier
            </button>
          </form>

          {/* Back to Dashboard button */}
          <button
            onClick={() => navigate("/gudang/supplier/dashboard")} // Navigate to the dashboard
            className="mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Kembali ke Dashboard
          </button>
        </main>
      </div>
    </div>
  );
};

export default AddSupplier;
