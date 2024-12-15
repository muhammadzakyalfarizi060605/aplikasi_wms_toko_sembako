import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Navbar from "../layouts/Navbar";
import Sidebar from "../layouts/Sidebar";
import axios from "axios";

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API
    axios
      .get("http://localhost:8000/api/detail-transaksi-barang")
      .then((response) => {
        setDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
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
              Dashboard Detail Transaksi Barang
            </h1>
            <p className="text-gray-600">
              Kelola data detail transaksi barang disini.
            </p>
          </div>

          {/* Tabel Detail Transaksi */}
          <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">
                Data Detail Transaksi Barang
              </h1>
              {/* Button to navigate to the "Tambah Data" form */}
              <Link to="/gudang/detail-transaksi-barang/tambah-data">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Tambah Data
                </button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">
                      Tanggal Transaksi
                    </th>
                    <th className="border border-gray-300 p-2">Nama Barang</th>
                    <th className="border border-gray-300 p-2">
                      Lokasi Penyimpanan
                    </th>
                    <th className="border border-gray-300 p-2">
                      Jumlah Barang
                    </th>
                    <th className="border border-gray-300 p-2">Satuan</th>
                    <th className="border border-gray-300 p-2">
                      Tanggal Kadaluwarsa
                    </th>
                    <th className="border border-gray-300 p-2">Status</th>
                    <th className="border border-gray-300 p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {details.map((detail, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">
                        {detail.tanggal_transaksi || "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {detail.nama_barang || "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {/* Menampilkan Lokasi Penyimpanan berdasarkan status */}
                        {detail.status === "disimpan"
                          ? detail.nama_rak || "N/A"
                          : detail.status === "dipindahkan"
                          ? detail.nama_rak_tujuan || "N/A"
                          : "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {detail.satuan || "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {detail.harga_beli_satuan}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {detail.tanggal_kadaluwarsa || "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {detail.status}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <Link
                          to={`/gudang/detail-transaksi-barang/edit-data/${detail.id_detail}`}
                        >
                          <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2">
                            Edit
                          </button>
                        </Link>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2">
                          Show
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
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
