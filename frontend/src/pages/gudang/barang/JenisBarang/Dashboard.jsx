import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [barangs, setBarangs] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/barang")
      .then((response) => {
        setBarangs(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  // Handle delete barang
  const handleDelete = (id_barang) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .delete(`http://localhost:8000/api/barang/${id_barang}`)
        .then(() => {
          setBarangs((prevBarangs) =>
            prevBarangs.filter((barang) => barang.id_barang !== id_barang)
          );
          alert("Barang berhasil dihapus!");
        })
        .catch((error) => {
          console.error("There was an error deleting the item!", error);
          alert("Terjadi kesalahan saat menghapus barang.");
        });
    } else {
      alert("Penghapusan barang dibatalkan.");
    }
  };

  // Function to navigate to edit page
  const handleEdit = (id_barang) => {
    navigate(`/gudang/barang/edit/${id_barang}`); // Navigate to the edit page
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
              Dashboard Barang
            </h1>
            <p className="text-gray-600">
              Menampilkan daftar barang yang tersedia.
            </p>
          </div>

          {/* Tombol Tambah Barang */}
          <div className="mb-4">
            <Link
              to="/gudang/jenis-barang/tambah"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Tambah Barang
            </Link>
          </div>

          {/* Tabel Barang */}
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Data Barang</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full mt-4 border-collapse">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Gambar Barang</th>
                    <th className="border px-4 py-2">Nama Barang</th>
                    <th className="border px-4 py-2">Kategori</th>
                    <th className="border px-4 py-2">Jumlah Stok</th>
                    <th className="border px-4 py-2">Satuan</th>
                    <th className="border px-4 py-2">Harga Jual</th>
                    <th className="border px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {barangs.map((barang) => (
                    <tr key={barang.id_barang}>
                      <td className="border px-4 py-2">
                        <img
                          src={`http://localhost:8000/storage/${barang.gambar_barang}`}
                          alt={barang.nama_barang}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="border px-4 py-2">{barang.nama_barang}</td>
                      <td className="border px-4 py-2">
                        {barang.kategori.nama_kategori}
                      </td>
                      <td className="border px-4 py-2">{barang.jumlah_stok}</td>
                      <td className="border px-4 py-2">{barang.satuan}</td>
                      <td className="border px-4 py-2">
                        {barang.harga_jual_persatuan}
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => handleEdit(barang.id_barang)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <Link
                          to={`/gudang/barang/show/${barang.id_barang}`}
                          className="bg-green-500 text-white px-2 py-1 ml-2 rounded"
                        >
                          Show
                        </Link>
                        <button
                          onClick={() => handleDelete(barang.id_barang)}
                          className="bg-red-500 text-white px-2 py-1 ml-2 rounded"
                        >
                          Delete
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
