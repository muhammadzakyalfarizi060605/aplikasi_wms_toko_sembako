import React, { useState, useEffect } from "react";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [laporan, setLaporan] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Fetch data laporan
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/detail-transaksi-penjualan")
      .then((response) => response.json())
      .then((data) => setLaporan(data))
      .catch((error) => console.error("Error fetching laporan:", error));
  }, []);

  // Function to handle print
  const handlePrint = () => {
    // Get the HTML content of the table
    const printContents = document.getElementById("laporanTable").outerHTML;

    // Store the original body content
    const originalContents = document.body.innerHTML;

    // Temporarily replace the body content with the table and print styles
    document.body.innerHTML = `
      <html>
        <head>
          <title>Print Laporan</title>
          <style>
            @media print {
              body { margin: 0; text-align: center; }
              table { width: 100%; border-collapse: collapse; margin-top: 30px; }
              th, td { padding: 10px; border: 1px solid #ddd; text-align: center; }
              thead { background-color: #007bff; color: white; }
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `;

    // Trigger the print dialog
    window.print();

    // Restore the original body content after printing
    document.body.innerHTML = originalContents;
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
              Laporan Detail Transaksi
            </h1>
            <p className="text-gray-600">
              Berikut adalah laporan detail transaksi penjualan.
            </p>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Print Laporan
            </button>
          </div>

          {/* Wrapper untuk tabel dengan overflow-x-auto */}
          <div className="overflow-x-auto mt-6">
            <table
              id="laporanTable"
              className="min-w-full table-auto border-collapse border border-gray-300"
            >
              <thead>
                <tr>
                  <th
                    colSpan="6"
                    className="px-4 py-2 border border-gray-300 text-center text-lg font-semibold"
                  >
                    Laporan Transaksi Penjualan
                  </th>
                </tr>
                <tr>
                  <th className="px-4 py-2 border border-gray-300">#</th>
                  <th className="px-4 py-2 border border-gray-300">
                    Nama Pembeli
                  </th>
                  <th className="px-4 py-2 border border-gray-300">
                    Nama Barang
                  </th>
                  <th className="px-4 py-2 border border-gray-300">
                    Harga Jual
                  </th>
                  <th className="px-4 py-2 border border-gray-300">Jumlah</th>
                  <th className="px-4 py-2 border border-gray-300">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {laporan.length > 0 ? (
                  laporan.map((item, index) => (
                    <tr key={item.id_detail_penjualan}>
                      <td className="px-4 py-2 border border-gray-300">
                        {index + 1}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {item.nama_pembeli}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {item.nama_barang}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {item.harga_jual_persatuan}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {item.jumlah_barang}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {item.subtotal}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center px-4 py-2 border border-gray-300"
                    >
                      Tidak ada data tersedia.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
