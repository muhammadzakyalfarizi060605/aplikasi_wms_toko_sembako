import React, { useState, useEffect } from "react";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  // Fetch data suppliers when the page loads
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/suppliers");
        setSuppliers(response.data); // Assuming response.data is an array of suppliers
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
    fetchSuppliers();
  }, []);

  // Handle delete supplier
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus supplier ini?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/suppliers/${id}`);
        alert("Supplier berhasil dihapus!");
        setSuppliers(
          suppliers.filter((supplier) => supplier.id_supplier !== id)
        ); // Update state after deletion
      } catch (error) {
        console.error("Error deleting supplier:", error);
      }
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

        {/* Main Dashboard Content */}
        <main className="flex-1 p-4">
          <div className="bg-white p-6 shadow-lg rounded-lg mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard Supplier
            </h1>
            <p className="text-gray-600">Kelola data supplier di sini.</p>
          </div>

          {/* Supplier Table */}
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Data Supplier</h1>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-2">
                      Nama Supplier
                    </th>
                    <th className="border border-gray-200 px-4 py-2">Email</th>
                    <th className="border border-gray-200 px-4 py-2">
                      No. Telp
                    </th>
                    <th className="border border-gray-200 px-4 py-2">Alamat</th>
                    <th className="border border-gray-200 px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-4 py-2 text-center text-gray-500"
                      >
                        Belum ada supplier
                      </td>
                    </tr>
                  ) : (
                    suppliers.map((supplier) => (
                      <tr key={supplier.id_supplier}>
                        <td className="border border-gray-200 px-4 py-2">
                          {supplier.nama_supplier}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {supplier.email}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {supplier.no_telp}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {supplier.alamat}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          <button
                            onClick={() =>
                              navigate(
                                `/gudang/supplier/show/${supplier.id_supplier}`
                              )
                            }
                            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 mr-2"
                          >
                            Show
                          </button>
                          <button
                            onClick={() =>
                              navigate(
                                `/gudang/supplier/edit/${supplier.id_supplier}`
                              )
                            }
                            className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(supplier.id_supplier)}
                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardSupplier;
