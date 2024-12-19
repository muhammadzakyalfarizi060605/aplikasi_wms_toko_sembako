import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Sidebar from "../../layouts/Sidebar";
import Navbar from "../../layouts/Navbar";

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch data from API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/detail-transaksi-penjualan")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Handler untuk aksi
  const handleShow = (id) => {
    navigate(`/kasir/detail-transaksi-penjualan/detail-data/${id}`); // Navigasi ke halaman detail
  };

  const handleEdit = (id) => {
    navigate(`/edit-transaksi-penjualan/${id}`); // Navigasi ke halaman edit
  };

  const handleDelete = (id, jumlah_barang, nama_barang) => {
    const confirmDelete = window.confirm(
      `Apakah Anda yakin ingin menghapus data ini? ${nama_barang} (Jumlah: ${jumlah_barang})`
    );
    if (confirmDelete) {
      axios
        .delete(`http://127.0.0.1:8000/api/detail-transaksi-penjualan/${id}`)
        .then(() => {
          // Setelah data dihapus, update stok barang di frontend
          alert("Data berhasil dihapus dan stok barang diperbarui.");

          // Mengupdate data dengan mengurangi barang yang telah dihapus dari list
          setData((prevData) =>
            prevData.filter((item) => item.id_detail_penjualan !== id)
          );
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        });
    }
  };

  const handleAddData = () => {
    navigate("/kasir/detail-transaksi-penjualan/tambah-data"); // Navigasi ke halaman tambah data
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
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard Content
            </h1>
            <p className="text-gray-600">
              Berikut adalah data detail transaksi penjualan:
            </p>
          </div>

          {/* Tombol Tambah Data */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleAddData}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Tambah Data
            </button>
          </div>

          {/* Wrapper untuk tabel dengan overflow-x-auto */}
          <div className="overflow-x-auto mt-4 bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Detail Transaksi Penjualan
            </h2>
            <table className="table-auto w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="border px-4 py-2">ID Detail</th>
                  <th className="border px-4 py-2">ID Penjualan</th>
                  <th className="border px-4 py-2">Nama Barang</th>
                  <th className="border px-4 py-2">Harga Jual Persatuan</th>
                  <th className="border px-4 py-2">Jumlah Barang</th>
                  <th className="border px-4 py-2">Subtotal</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">
                        {item.id_detail_penjualan}
                      </td>
                      <td className="border px-4 py-2">{item.nama_pembeli}</td>
                      <td className="border px-4 py-2">
                        {item.nama_barang || "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {item.harga_jual_persatuan}
                      </td>
                      <td className="border px-4 py-2">{item.jumlah_barang}</td>
                      <td className="border px-4 py-2">{item.subtotal}</td>
                      <td className="border px-4 py-2 text-center space-x-2">
                        <button
                          onClick={() => handleShow(item.id_detail_penjualan)}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                          Show
                        </button>
                        <button
                          onClick={() => handleEdit(item.id_detail_penjualan)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(
                              item.id_detail_penjualan,
                              item.jumlah_barang,
                              item.nama_barang
                            )
                          }
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="border px-4 py-2 text-center" colSpan="7">
                      Tidak ada data yang tersedia.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
