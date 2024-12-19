import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../layouts/Sidebar";
import Navbar from "../../layouts/Navbar";

const DetailPage = () => {
  const { id } = useParams(); // Mendapatkan ID dari URL
  const [detail, setDetail] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  // Fetch detail data from API
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/detail-transaksi-penjualan/${id}`)
      .then((response) => {
        setDetail(response.data);
      })
      .catch((error) => {
        console.error("Error fetching detail data:", error);
      });
  }, [id]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Detail Page Content */}
        <main className="flex-1 p-4">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800">
              Detail Transaksi
            </h1>
            {detail ? (
              <div className="mt-4">
                <p>
                  <strong>Nama Pembeli:</strong> {detail.nama_pembeli}
                </p>
                <p>
                  <strong>Nama Barang:</strong> {detail.nama_barang || "N/A"}
                </p>
                <p>
                  <strong>Harga Jual Persatuan:</strong>{" "}
                  {detail.harga_jual_persatuan}
                </p>
                <p>
                  <strong>Jumlah Barang:</strong> {detail.jumlah_barang}
                </p>
                <p>
                  <strong>Subtotal:</strong> {detail.subtotal}
                </p>
              </div>
            ) : (
              <p className="text-gray-600">Memuat detail data...</p>
            )}

            <div className="mt-6">
              <button
                onClick={() => navigate(-1)} // Navigasi kembali ke halaman sebelumnya
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Kembali
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailPage;
