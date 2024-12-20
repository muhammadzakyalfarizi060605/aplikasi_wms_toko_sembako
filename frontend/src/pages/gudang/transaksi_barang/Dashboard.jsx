import React, { useState, useEffect } from "react";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [transaksiBarang, setTransaksiBarang] = useState([]);
  const navigate = useNavigate();

  // Fetch transaction data from the Laravel API
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/transaksi-barang")
      .then((response) => {
        setTransaksiBarang(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  // Show transaction details (navigate to a details page or modal)
  const handleShow = (id) => {
    navigate(`/transaksi-barang/${id}`);
  };

  // Edit transaction (navigate to an edit page)
  const handleEdit = (id) => {
    navigate(`/edit-transaksi/${id}`);
  };

  // Delete transaction with SweetAlert confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin ?",
      text: "Ingin menghapus data ini !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/transaksi-barang/${id}`)
          .then((response) => {
            Swal.fire(
              "Deleted!",
              "Your transaction has been deleted.",
              "success"
            );
            setTransaksiBarang(
              transaksiBarang.filter((item) => item.id_transaksi !== id)
            );
          })
          .catch((error) => {
            console.error(
              "There was an error deleting the transaction!",
              error
            );
            Swal.fire(
              "Error!",
              "There was an error deleting the transaction.",
              "error"
            );
          });
      }
    });
  };

  // Navigate to the Add Transaction page
  const handleAddTransaction = () => {
    navigate("/transaksi-barang/create");
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
              Dashboard Transaksi Barang
            </h1>
            <p className="text-gray-600">
              Kelola data transaksi barang di sini.
            </p>
            <button
              onClick={handleAddTransaction}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Tambah Data Transaksi
            </button>
          </div>

          {/* Transaction Data Table */}
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Data Transaksi Barang</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">ID Transaksi</th>
                    <th className="px-4 py-2 text-left">Nama Supplier</th>
                    <th className="px-4 py-2 text-left">Nama User</th>
                    <th className="px-4 py-2 text-left">Tanggal Transaksi</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transaksiBarang.map((transaksi) => (
                    <tr key={transaksi.id_transaksi} className="border-t">
                      <td className="px-4 py-2">{transaksi.id_transaksi}</td>
                      <td className="px-4 py-2">
                        {transaksi.supplier.nama_supplier}
                      </td>
                      <td className="px-4 py-2">
                        {transaksi.user.nama_lengkap}
                      </td>
                      <td className="px-4 py-2">
                        {transaksi.tanggal_transaksi}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleShow(transaksi.id_transaksi)}
                          className="text-blue-500 px-2 py-1 rounded"
                        >
                          Show
                        </button>
                        <button
                          onClick={() => handleEdit(transaksi.id_transaksi)}
                          className="ml-2 text-yellow-500 px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(transaksi.id_transaksi)}
                          className="ml-2 text-red-500 px-2 py-1 rounded"
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
