import React, { useState, useEffect } from "react";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [raks, setRaks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // For navigation

  // Fetch data from API
  const fetchRaks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/rak");
      setRaks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching raks:", error);
      setLoading(false); // Stop loading even if there's an error
    }
  };

  useEffect(() => {
    fetchRaks();
  }, []);

  // Delete rak
  const deleteRak = async (id_rak) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/rak/${id_rak}`);
        setRaks(raks.filter((rak) => rak.id_rak !== id_rak)); // Remove rak from state
      } catch (error) {
        console.error("Error deleting rak:", error);
      }
    }
  };

  const handleAddRak = () => {
    navigate("/gudang/rak/add-rak");
  };

  const handleEditRak = (id_rak) => {
    navigate(`/gudang/rak/edit-rak/${id_rak}`); // Ensure the URL has the correct path with id_rak
  };

  const handleShowRak = (id_rak) => {
    console.log(id_rak);
    navigate(`/show-rak/${id_rak}`); // Ensure the URL has the correct path with id_rak
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
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Rak</h1>
            <p className="text-gray-600">Kelola data rak di sini.</p>
          </div>

          {/* Tabel Rak */}
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Data Rak</h1>
            <div className="overflow-x-auto">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <table className="table-auto w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-200 px-4 py-2">#</th>
                      <th className="border border-gray-200 px-4 py-2">
                        Kode Rak
                      </th>
                      <th className="border border-gray-200 px-4 py-2">
                        Nama Rak
                      </th>
                      <th className="border border-gray-200 px-4 py-2">
                        Lokasi Rak
                      </th>
                      <th className="border border-gray-200 px-4 py-2">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {raks.map((rak, index) => (
                      <tr key={rak.id_rak}>
                        <td className="border border-gray-200 px-4 py-2">
                          {index + 1}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {rak.kode_rak}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {rak.nama_rak}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {rak.lokasi_rak}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          <button
                            className="text-green-500 hover:text-green-700"
                            onClick={() => handleShowRak(rak.id_rak)} // Tombol Show
                          >
                            Show
                          </button>
                          <button
                            className="text-yellow-500 hover:text-yellow-700 mr-2"
                            onClick={() => handleEditRak(rak.id_rak)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => deleteRak(rak.id_rak)}
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
          </div>

          {/* Button to Add Rak */}
          <button
            onClick={handleAddRak}
            className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Tambah Rak
          </button>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
