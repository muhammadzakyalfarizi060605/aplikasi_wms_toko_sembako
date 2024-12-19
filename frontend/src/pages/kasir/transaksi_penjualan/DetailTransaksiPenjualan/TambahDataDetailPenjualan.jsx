import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Sidebar from "../../layouts/Sidebar"; // Import Sidebar layout
import Navbar from "../../layouts/Navbar"; // Import Navbar layout

const TambahDetailTransaksiForm = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Sidebar state
  const [penjualan, setPenjualan] = useState([]);
  const [barang, setBarang] = useState([]);
  const [formData, setFormData] = useState({
    id_penjualan: "",
    id_barang: "",
    harga_jual_persatuan: "",
    jumlah_barang: 1,
    subtotal: 0,
  });
  const [stokBarang, setStokBarang] = useState(0); // State for stock
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch sales data
    axios
      .get("http://127.0.0.1:8000/api/transaksi-penjualan")
      .then((response) => {
        setPenjualan(response.data);
      });

    // Fetch items data
    axios.get("http://127.0.0.1:8000/api/barang").then((response) => {
      setBarang(response.data);
    });
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Handle quantity change
  const handleJumlahBarangChange = (e) => {
    const jumlah_barang = e.target.value;
    if (jumlah_barang > stokBarang) {
      alert("Mohon maaf, stok terbatas.");
      setFormData((prevState) => ({
        ...prevState,
        jumlah_barang: stokBarang,
        subtotal: prevState.harga_jual_persatuan * stokBarang,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        jumlah_barang,
        subtotal: prevState.harga_jual_persatuan * jumlah_barang,
      }));
    }
  };

  // Handle item change
  const handleBarangChange = (e) => {
    const id_barang = e.target.value;
    const barangTerpilih = barang.find(
      (item) => item.id_barang === parseInt(id_barang)
    );
    if (barangTerpilih) {
      const harga_jual = parseFloat(barangTerpilih.harga_jual_persatuan);
      const stok = barangTerpilih.jumlah_stok;

      setStokBarang(stok);
      setFormData((prevState) => ({
        ...prevState,
        id_barang,
        harga_jual_persatuan: harga_jual || 0,
        subtotal: harga_jual * prevState.jumlah_barang,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        id_barang,
        harga_jual_persatuan: 0,
        subtotal: 0,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.jumlah_barang > stokBarang) {
      alert("Mohon maaf, stok terbatas.");
      return;
    }

    axios
      .post("http://127.0.0.1:8000/api/detail-transaksi-penjualan", formData)
      .then(() => {
        alert("Data berhasil ditambahkan");
        navigate("/kasir/detail-transaksi-barang/dashboard"); // Redirect to dashboard
      })
      .catch(() => {
        alert("Terjadi kesalahan saat menambahkan data");
      });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Form Content */}
        <main className="flex-1 p-4">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Tambah Detail Transaksi Penjualan
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="id_penjualan"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nama Pembeli
                </label>
                <select
                  id="id_penjualan"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  value={formData.id_penjualan}
                  onChange={(e) =>
                    setFormData({ ...formData, id_penjualan: e.target.value })
                  }
                >
                  <option value="">Pilih Nama Pembeli</option>
                  {penjualan.map((item) => (
                    <option key={item.id_penjualan} value={item.id_penjualan}>
                      {item.nama_pembeli}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="id_barang"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nama Barang
                </label>
                <select
                  id="id_barang"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  value={formData.id_barang}
                  onChange={handleBarangChange}
                >
                  <option value="">Pilih Nama Barang</option>
                  {barang.map((item) => (
                    <option key={item.id_barang} value={item.id_barang}>
                      {item.nama_barang}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="harga_jual_persatuan"
                  className="block text-sm font-medium text-gray-700"
                >
                  Harga Jual Persatuan
                </label>
                <input
                  type="text"
                  id="harga_jual_persatuan"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  value={formData.harga_jual_persatuan}
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="jumlah_barang"
                  className="block text-sm font-medium text-gray-700"
                >
                  Jumlah Barang
                </label>
                <input
                  type="number"
                  id="jumlah_barang"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  value={formData.jumlah_barang}
                  onChange={handleJumlahBarangChange}
                  min="1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="subtotal"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subtotal
                </label>
                <input
                  type="text"
                  id="subtotal"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  value={formData.subtotal}
                  readOnly
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
              >
                Simpan
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TambahDetailTransaksiForm;
