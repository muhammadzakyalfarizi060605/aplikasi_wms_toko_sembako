import React, { useState, useEffect } from "react";
import axios from "axios"; // Pastikan axios sudah terinstall
import { useParams, useNavigate } from "react-router-dom"; // Menggunakan useNavigate
import Swal from "sweetalert2"; // Import SweetAlert

const EditPage = () => {
  const { id_rak } = useParams(); // Mengambil parameter id_rak dari URL
  const [rak, setRak] = useState({
    kode_rak: "",
    nama_rak: "",
    lokasi_rak: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook untuk navigasi

  // Fetch data rak berdasarkan id
  const fetchRak = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/rak/${id_rak}`
      );
      setRak(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rak:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error fetching the rak data.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    fetchRak();
  }, [id_rak]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/rak/${id_rak}`, rak);
      // Success alert
      Swal.fire({
        title: "Success!",
        text: "Rak updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate(`/gudang/rack/dashboard`); // Navigate to the dashboard after success
    } catch (error) {
      console.error("Error updating rak:", error);
      // Error alert
      Swal.fire({
        title: "Error!",
        text: "There was an error updating the rak.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Rak</h1>
      <div className="bg-white p-6 shadow-lg rounded-lg mb-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Kode Rak</label>
            <input
              type="text"
              value={rak.kode_rak}
              onChange={(e) => setRak({ ...rak, kode_rak: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nama Rak</label>
            <input
              type="text"
              value={rak.nama_rak}
              onChange={(e) => setRak({ ...rak, nama_rak: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Lokasi Rak</label>
            <input
              type="text"
              value={rak.lokasi_rak}
              onChange={(e) => setRak({ ...rak, lokasi_rak: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Rak
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
