import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../layouts/Sidebar";
import Navbar from "../../layouts/Navbar";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const KasirDashboard = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Fetch data transaksi penjualan dari API
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/transaksi-penjualan")
      .then((response) => {
        setTransaksi(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  // Fungsi untuk navigasi ke halaman tambah data
  const handleAddData = () => {
    navigate("/kasir/transaksi-penjualan/tambah-data"); // Arahkan ke halaman form tambah transaksi
  };

  // Fungsi untuk navigasi ke halaman show transaksi
  const handleShow = (id) => {
    navigate(`/kasir/transaksi-penjualan/detail-data/${id}`); // Arahkan ke halaman show transaksi
  };

  // Fungsi untuk navigasi ke halaman edit transaksi
  const handleEdit = (id) => {
    navigate(`/kasir/transaksi-penjualan/edit-data/${id}`); // Arahkan ke halaman edit transaksi
  };

  // Fungsi untuk menangani penghapusan data transaksi
  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
      axios
        .delete(`http://localhost:8000/api/transaksi-penjualan/${id}`)
        .then((response) => {
          // Update the state by filtering out the deleted transaction
          setTransaksi(transaksi.filter((item) => item.id_penjualan !== id));

          // Alert success after successful deletion
          window.alert("Transaksi berhasil dihapus!");
        })
        .catch((error) => {
          console.error("There was an error deleting the data!", error);
        });
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Main Dashboard Content */}
        <main className="flex-1 p-4">
          {/* Dashboard Title */}
          <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard Kasir
            </h1>
            <p className="text-gray-600">Data transaksi penjualan kasir.</p>
          </div>

          {/* Tombol Tambah Data */}
          <div className="mb-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleAddData}
            >
              Tambah Data
            </button>
          </div>

          {/* Wrapper untuk tabel dengan overflow-x-auto */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left border">Nama Kasir</th>
                  <th className="px-4 py-2 text-left border">Nama Pembeli</th>
                  <th className="px-4 py-2 text-left border">Total Harga</th>
                  <th className="px-4 py-2 text-left border">Diskon</th>
                  <th className="px-4 py-2 text-left border">
                    Harga Setelah Diskon
                  </th>
                  <th className="px-4 py-2 text-left border">
                    Tanggal Penjualan
                  </th>
                  <th className="px-4 py-2 text-left border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {transaksi.map((item) => (
                  <tr key={item.id_penjualan} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">
                      {item.user ? item.user.nama_lengkap : "N/A"}
                    </td>
                    <td className="px-4 py-2 border">{item.nama_pembeli}</td>
                    <td className="px-4 py-2 border">{item.total_harga}</td>
                    <td className="px-4 py-2 border">{item.diskon}</td>
                    <td className="px-4 py-2 border">
                      {item.harga_setelah_diskon}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.tanggal_penjualan}
                    </td>
                    <td className="px-4 py-2 border">
                      {/* Button Edit */}
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                        onClick={() => handleEdit(item.id_penjualan)} // Navigate to Edit page
                      >
                        Edit
                      </button>

                      {/* Button Show */}
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        onClick={() => handleShow(item.id_penjualan)} // Navigate to Show page
                      >
                        Show
                      </button>

                      {/* Button Delete */}
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => handleDelete(item.id_penjualan)} // Handle delete
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default KasirDashboard;
