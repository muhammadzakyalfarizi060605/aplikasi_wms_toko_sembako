import React, { useState, useEffect } from "react";
import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const KategoriBarangAdd = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [nama_kategori, setNamaKategori] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const navigate = useNavigate(); // Gunakan useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/kategori-barang", {
        nama_kategori,
        deskripsi,
      })
      .then((res) => {
        navigate("/gudang/kategori-barang/dashboard"); // Navigasi ke halaman utama setelah berhasil menambah kategori
      })
      .catch((err) => console.error(err));
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

        {/* Main Dashboard Content */}
        <main className="flex-1 p-4">
          <div className="bg-white p-6 shadow-lg rounded-lg mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard Kategori Barang
            </h1>
            <p className="text-gray-600">Kelola kategori barang disini.</p>
          </div>

          {/* Tabel Rak */}
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
              Tambah Data Kategori Barang
            </h1>
            <div className="container mx-auto p-4">
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="block">Nama Kategori</label>
                  <input
                    type="text"
                    value={nama_kategori}
                    onChange={(e) => setNamaKategori(e.target.value)}
                    className="border p-2 w-full"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block">Deskripsi</label>
                  <textarea
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    className="border p-2 w-full"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 mt-4 rounded"
                >
                  Tambah Kategori
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default KategoriBarangAdd;
