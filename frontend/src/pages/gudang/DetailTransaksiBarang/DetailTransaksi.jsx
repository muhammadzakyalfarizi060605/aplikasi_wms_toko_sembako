import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import Sidebar from "../layouts/Sidebar";
import axios from "axios";

const ShowDetailTransaksi = () => {
  const { id_detail } = useParams(); // Get the id_detail from the URL parameters
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    // Fetch the detail data based on id_detail
    axios
      .get(`http://localhost:8000/api/detail-transaksi-barang/${id_detail}`)
      .then((response) => {
        console.log(response.data); // Debug: log data

        // Correct data access
        setDetail(response.data.detail); // Assuming the JSON structure has a 'detail' key
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Terjadi kesalahan saat memuat data.");
        setLoading(false);
      });
  }, [id_detail]);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>{error}</div>;
  }

  // Handle case when no detail is found
  if (!detail) {
    return <div>No detail found for this transaction.</div>;
  }

  // Destructuring the detail data for cleaner code
  const {
    tanggal_transaksi,
    nama_barang,
    status,
    id_rak,
    nama_rak,
    id_rak_tujuan,
    nama_rak_tujuan,
    jumlah_barang,
    satuan,
    harga_beli_satuan,
    tanggal_kadaluwarsa,
  } = detail;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 p-4">
          <div className="bg-white p-6 shadow-lg rounded-lg mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Detail Transaksi Barang
            </h1>
            <p className="text-gray-600">
              Berikut adalah informasi detail transaksi barang.
            </p>
          </div>

          {/* Detail Transaksi */}
          <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
            <div className="space-y-4">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">Informasi Transaksi</h2>
                <Link to="/gudang/detail-transaksi-barang">
                  <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                    Kembali ke Daftar
                  </button>
                </Link>
              </div>

              {/* Tampilkan Detail Transaksi */}
              <div>
                <p className="text-gray-700 font-medium">Tanggal Transaksi:</p>
                <p>{tanggal_transaksi || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Nama Barang:</p>
                <p>{nama_barang || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Lokasi Penyimpanan:</p>
                <p>
                  {status === "disimpan" ? (
                    <>Nama Rak: {nama_rak || "N/A"}</>
                  ) : status === "dipindahkan" ? (
                    <>Nama Rak : {nama_rak_tujuan || "N/A"}</>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Jumlah Barang:</p>
                <p>{jumlah_barang || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Satuan:</p>
                <p>{satuan || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Harga Beli Satuan:</p>
                <p>{harga_beli_satuan || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-700 font-medium">
                  Tanggal Kadaluwarsa:
                </p>
                <p>{tanggal_kadaluwarsa || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Status:</p>
                <p>{status || "N/A"}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShowDetailTransaksi;
