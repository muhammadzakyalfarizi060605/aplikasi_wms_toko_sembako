import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams untuk mengambil id dari URL

const DetailData = () => {
  const [transaksi, setTransaksi] = useState(null);
  const { id } = useParams(); // Mengambil id dari URL
  const navigate = useNavigate();

  // Fetch data transaksi berdasarkan ID
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/transaksi-penjualan/${id}`)
      .then((response) => {
        setTransaksi(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [id]);

  // Fungsi untuk navigasi kembali ke dashboard kasir
  const handleBack = () => {
    navigate("/kasir/dashboard");
  };

  return (
    <div className="flex flex-col p-4">
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleBack}
        >
          Kembali ke Dashboard
        </button>
      </div>

      {transaksi ? (
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Detail Transaksi Penjualan
          </h1>

          <div className="space-y-4">
            <p>
              <strong>Nama Kasir:</strong>{" "}
              {transaksi.user ? transaksi.user.nama_lengkap : "N/A"}
            </p>
            <p>
              <strong>Nama Pembeli:</strong> {transaksi.nama_pembeli}
            </p>
            <p>
              <strong>Total Harga:</strong> {transaksi.total_harga}
            </p>
            <p>
              <strong>Diskon:</strong> {transaksi.diskon}
            </p>
            <p>
              <strong>Harga Setelah Diskon:</strong>{" "}
              {transaksi.harga_setelah_diskon}
            </p>
            <p>
              <strong>Tanggal Penjualan:</strong> {transaksi.tanggal_penjualan}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailData;
