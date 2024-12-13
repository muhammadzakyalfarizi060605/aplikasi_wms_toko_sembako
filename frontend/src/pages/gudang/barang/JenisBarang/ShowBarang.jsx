import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";

const ShowBarang = () => {
  const { id_barang } = useParams(); // Mengambil id_barang dari URL
  const [barang, setBarang] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  // Fetch data barang
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/barang/${id_barang}`)
      .then((response) => {
        setBarang(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the barang details!", error);
      });
  }, [id_barang]);

  if (!barang) return <div>Loading...</div>; // Menunggu data barang terload

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <main className="flex-1 p-4">
          <div className="bg-white p-6 shadow-lg rounded-lg mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Detail Barang</h1>
            <p className="text-gray-600">
              Menampilkan informasi detail barang.
            </p>
          </div>

          {/* Tabel Barang */}
          <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">{barang.nama_barang}</h2>

            <div className="bg-white p-6 shadow-lg rounded-lg mb-4">
              <div className="flex justify-between">
                <div>
                  <p>
                    <strong>Kategori: </strong>
                    {barang.kategori.nama_kategori}
                  </p>
                  <p>
                    <strong>Jumlah Stok: </strong>
                    {barang.jumlah_stok}
                  </p>
                  <p>
                    <strong>Satuan: </strong>
                    {barang.satuan}
                  </p>
                  <p>
                    <strong>Harga Jual: </strong>
                    {barang.harga_jual_persatuan}
                  </p>
                </div>
                <div>
                  <img
                    src={`http://localhost:8000/storage/${barang.alamat_gambar}`}
                    alt={barang.nama_barang}
                    className="w-48 h-48 object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={() => navigate("/gudang/dashboard")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Kembali ke Dashboard
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShowBarang;
