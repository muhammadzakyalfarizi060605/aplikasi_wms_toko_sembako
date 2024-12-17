import React, { useState, useEffect } from "react";
import Sidebar from "./layouts/Sidebar";
import Navbar from "./layouts/Navbar";
import axios from "axios"; // Untuk mengambil data dari API
import { jsPDF } from "jspdf"; // Untuk membuat PDF
import "jspdf-autotable"; // Import plugin autoTable

const LaporanDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [barangData, setBarangData] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Mengambil data stok barang dari API
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/barang") // Sesuaikan URL dengan API endpoint Anda
      .then((response) => {
        setBarangData(response.data); // Menyimpan data ke state
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  // Fungsi untuk mencetak laporan dalam format PDF
  const printReport = () => {
    const doc = new jsPDF();

    // Menambahkan judul h2 ke PDF dan menempatkannya di tengah
    const title = document.querySelector("h2").innerText;

    doc.setFontSize(16);

    // Menghitung posisi horizontal agar judul berada di tengah
    const titleWidth =
      (doc.getStringUnitWidth(title) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const xPosition = (doc.internal.pageSize.width - titleWidth) / 2;

    // Menambahkan teks judul ke PDF dengan posisi x di tengah
    doc.text(title, xPosition, 10);

    // Menambahkan tabel ke PDF
    const table = document.getElementById("stock-table");
    doc.autoTable({ html: table, startY: 20 }); // Mengonversi tabel menjadi PDF setelah judul

    // Menyimpan PDF
    doc.save("laporan_stok.pdf");
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
        <main className="flex-1 p-4 ">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800">Laporan Stok</h1>
            <p className="text-gray-600">
              Halaman yang digunakan untuk mencetak laporan stok
            </p>
          </div>

          {/* Judul laporan di atas tabel */}
          <div className="text-center my-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Laporan Stok Barang Yang Tersedia Di Gudang Desember 2024
            </h2>
          </div>

          {/* Wrapper untuk tabel dengan overflow-x-auto */}
          <div className="overflow-x-auto mt-4">
            <table
              id="stock-table"
              className="min-w-full bg-white border border-gray-200"
            >
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Nama Barang</th>
                  <th className="py-2 px-4 border-b">Kategori</th>
                  <th className="py-2 px-4 border-b">Jumlah Stok</th>
                  <th className="py-2 px-4 border-b">Satuan</th>
                  <th className="py-2 px-4 border-b">Harga Jual</th>
                </tr>
              </thead>
              <tbody>
                {barangData.map((barang) => (
                  <tr key={barang.id_barang}>
                    <td className="py-2 px-4 border-b">{barang.nama_barang}</td>
                    <td className="py-2 px-4 border-b">
                      {barang.kategori?.nama_kategori || "Tidak ada kategori"}
                    </td>
                    <td className="py-2 px-4 border-b">{barang.jumlah_stok}</td>
                    <td className="py-2 px-4 border-b">{barang.satuan}</td>
                    <td className="py-2 px-4 border-b">
                      {barang.harga_jual_persatuan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tombol untuk mencetak laporan */}
          <div className="mt-4">
            <button
              onClick={printReport}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600"
            >
              Cetak Laporan
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LaporanDashboard;
