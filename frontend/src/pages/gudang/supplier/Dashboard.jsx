import React, { useState, useEffect } from "react";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../index.css";

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // useNavigate for navigation in React Router v6

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/suppliers");
      setSuppliers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      setLoading(false);
    }
  };

  const handleEditClick = (id) => {
    // Navigasi ke halaman edit supplier dengan membawa id_supplier
    navigate(`/edit-supplier/${id}`);
  };

  const deleteSupplier = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/suppliers/${id}`);
      setSuppliers(suppliers.filter((supplier) => supplier.id_supplier !== id));
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  const handleAddSupplier = () => {
    navigate("/gudang/dashboard/supplier/add-supplier"); // Use navigate to go to the add-supplier page
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
              Dashboard Supplier
            </h1>
            <p className="text-gray-600">
              This is where your main content goes.
            </p>
          </div>

          {/* Wrapper for the table with overflow-x-auto */}
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Data Supplier</h1>

            {/* Add Supplier Button */}
            <button
              onClick={handleAddSupplier}
              className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Tambah Supplier
            </button>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="table-auto w-full text-left border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Nama</th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                    <th className="border border-gray-300 px-4 py-2">
                      No. Telp
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Alamat</th>
                    <th className="border border-gray-300 px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier) => (
                    <tr key={supplier.id_supplier}>
                      <td className="border border-gray-300 px-4 py-2">
                        {supplier.nama_supplier}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {supplier.email}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {supplier.no_telp}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {supplier.alamat}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => handleEditClick(supplier.id_supplier)}
                        >
                          Edit
                        </button>
                        <span className="mx-2">|</span>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => {
                            // Menampilkan konfirmasi sebelum melanjutkan penghapusan
                            const isConfirmed = window.confirm(
                              "Apakah Anda yakin ingin menghapus supplier ini?"
                            );

                            // Jika user mengkonfirmasi (klik 'OK'), maka jalankan fungsi deleteSupplier
                            if (isConfirmed) {
                              deleteSupplier(supplier.id_supplier);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
