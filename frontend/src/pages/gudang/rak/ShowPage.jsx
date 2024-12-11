import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

const ShowRak = () => {
  const { id_rak } = useParams(); // Mendapatkan id_rak dari parameter URL
  const [rak, setRak] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Untuk navigasi kembali

  // Fetch data rak berdasarkan id_rak
  const fetchRak = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/rak/${id_rak}`
      );
      setRak(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rak data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRak();
  }, [id_rak]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Main ShowRak Content */}
        <main className="flex-1 p-4">
          <div className="bg-white p-6 shadow-lg rounded-lg mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Detail Rak</h1>
            <p className="text-gray-600">Informasi lengkap mengenai rak.</p>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : rak ? (
            <div className="bg-white p-6 shadow rounded-lg">
              <p className="text-gray-800 mb-2">
                <strong>Kode Rak:</strong> {rak.kode_rak}
              </p>
              <p className="text-gray-800 mb-2">
                <strong>Nama Rak:</strong> {rak.nama_rak}
              </p>
              <p className="text-gray-800 mb-2">
                <strong>Lokasi Rak:</strong> {rak.lokasi_rak}
              </p>
              <button
                onClick={() => navigate(-1)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Kembali
              </button>
            </div>
          ) : (
            <p className="text-red-500">Rak tidak ditemukan.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShowRak;
