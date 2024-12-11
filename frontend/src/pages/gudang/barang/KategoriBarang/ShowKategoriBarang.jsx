import React, { useState, useEffect } from "react";
import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ShowKategori = () => {
  const { id } = useParams(); // Mengambil parameter id dari URL
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [kategori, setKategori] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/kategori-barang/${id}`)
      .then((res) => {
        setKategori(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!kategori) {
    return <div>Loading...</div>;
  }

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

        {/* Main Content */}
        <main className="flex-1 p-4">
          <div className="bg-white p-6 shadow-lg rounded-lg mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Detail Kategori Barang
            </h1>
            <p className="text-gray-600">Menampilkan detail kategori barang.</p>
          </div>

          <div className="bg-white p-6 shadow-lg rounded-lg mb-4">
            <h2 className="text-xl font-bold mb-4">{kategori.nama_kategori}</h2>
            <p className="text-gray-600 mb-4">{kategori.deskripsi}</p>
            <Link
              to="/gudang/kategori-barang/dashboard"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Kembali ke Dashboard
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShowKategori;
