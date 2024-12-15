// TransaksiDetail.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const TransaksiDetail = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // For navigation
  const [transaksi, setTransaksi] = useState(null);

  useEffect(() => {
    // Fetch the details of the transaction based on the ID
    axios
      .get(`http://localhost:8000/api/transaksi-barang/${id}`)
      .then((response) => {
        setTransaksi(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the transaksi details!",
          error
        );
      });
  }, [id]);

  if (!transaksi) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Detail Transaksi</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h5 className="text-xl font-semibold mb-2">
          ID Transaksi: {transaksi.id_transaksi}
        </h5>

        <p className="text-gray-700 mb-2">
          <strong>User:</strong>{" "}
          {transaksi.user ? transaksi.user.nama_lengkap : "N/A"}
        </p>

        <p className="text-gray-700 mb-2">
          <strong>Supplier:</strong>{" "}
          {transaksi.supplier ? transaksi.supplier.nama_supplier : "N/A"}
        </p>

        <p className="text-gray-700 mb-6">
          <strong>Tanggal Transaksi:</strong> {transaksi.tanggal_transaksi}
        </p>

        <button
          onClick={() => navigate("/gudang/transaksi-barang/dashboard")} // Navigate back to the dashboard
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
};

export default TransaksiDetail;
