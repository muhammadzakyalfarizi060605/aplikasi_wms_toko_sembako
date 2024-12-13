import React, { useState, useEffect } from "react";
import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [kategori, setKategori] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/kategori-barang")
      .then((res) => {
        console.log(res.data); // Log to inspect the data structure
        setKategori(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
      axios
        .delete(`http://localhost:8000/api/kategori-barang/${id}`)
        .then((res) => {
          setKategori(kategori.filter((k) => k.id_kategori !== id));
        })
        .catch((err) => console.error(err));
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

        {/* Main Content */}
        <main className="flex-1 p-4">
          <div className="bg-white p-6 shadow-lg rounded-lg mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard Kategori Barang
            </h1>
            <p className="text-gray-600">Kelola kategori barang disini.</p>
          </div>

          {/* Tabel Rak */}
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Data Kategori Barang</h1>
            <div className="overflow-x-auto">
              <Link
                to="/gudang/kategori-barang/add"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Tambah Kategori
              </Link>
              <table className="min-w-full mt-4 border-collapse">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Nama Kategori</th>
                    <th className="border px-4 py-2">Deskripsi</th>
                    <th className="border px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {kategori.map((kategori) => (
                    <tr key={kategori.id_kategori}>
                      <td className="border px-4 py-2">
                        {kategori.nama_kategori}
                      </td>
                      <td className="border px-4 py-2">{kategori.deskripsi}</td>
                      <td className="border px-4 py-2">
                        <Link
                          to={`/gudang/kategori-barang/edit/${kategori.id_kategori}`}
                          className="bg-yellow-500 text-white p-2 rounded"
                        >
                          Edit
                        </Link>
                        <Link
                          to={`/gudang/kategori-barang/show/${kategori.id_kategori}`}
                          className="bg-green-500 text-white p-2 ml-2 rounded"
                        >
                          Show
                        </Link>
                        <button
                          onClick={() => handleDelete(kategori.id_kategori)}
                          className="bg-red-500 text-white p-2 ml-2 rounded"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
