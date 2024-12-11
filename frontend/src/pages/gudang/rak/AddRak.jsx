import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddRak = () => {
  const [kodeRak, setKodeRak] = useState("");
  const [namaRak, setNamaRak] = useState("");
  const [lokasiRak, setLokasiRak] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/rak", {
        kode_rak: kodeRak,
        nama_rak: namaRak,
        lokasi_rak: lokasiRak,
      });
      navigate("/gudang/rak/dashboard"); // Redirect to dashboard after success
    } catch (error) {
      console.error("Error adding rak:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tambah Rak</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Kode Rak</label>
          <input
            type="text"
            value={kodeRak}
            onChange={(e) => setKodeRak(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nama Rak</label>
          <input
            type="text"
            value={namaRak}
            onChange={(e) => setNamaRak(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Lokasi Rak</label>
          <input
            type="text"
            value={lokasiRak}
            onChange={(e) => setLokasiRak(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        {/* Tombol Simpan */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default AddRak;
