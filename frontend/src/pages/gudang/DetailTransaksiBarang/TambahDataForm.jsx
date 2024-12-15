import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../layouts/Navbar";
import Sidebar from "../layouts/Sidebar";

const TambahDataForm = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [transaksiOptions, setTransaksiOptions] = useState([]);
  const [barangOptions, setBarangOptions] = useState([]);
  const [rakOptions, setRakOptions] = useState([]);

  const [formData, setFormData] = useState({
    id_transaksi: "",
    id_barang: "",
    id_rak: "",
    jumlah_barang: "",
    satuan: "", // Menyimpan nama satuan
    harga_beli_satuan: "",
    tanggal_kadaluwarsa: "",
    status: "disimpan", // Status default
  });

  useEffect(() => {
    // Fetch data untuk dropdown
    axios
      .get("http://localhost:8000/api/transaksi-barang")
      .then((response) => setTransaksiOptions(response.data))
      .catch((error) => console.error("Error fetching transaksi data:", error));

    axios
      .get("http://localhost:8000/api/barang")
      .then((response) => setBarangOptions(response.data))
      .catch((error) => console.error("Error fetching barang data:", error));

    axios
      .get("http://localhost:8000/api/rak")
      .then((response) => setRakOptions(response.data))
      .catch((error) => console.error("Error fetching rak data:", error));
  }, []);

  // Handle perubahan barang yang dipilih
  const handleBarangChange = (event) => {
    const barangId = event.target.value;
    const selected = barangOptions.find((b) => b.id_barang == barangId);
    setFormData({
      ...formData,
      id_barang: barangId,
      satuan: selected ? selected.satuan : "", // Set satuan based on selected barang
    });
  };

  // Handle perubahan rak yang dipilih
  const handleRakChange = (event) => {
    setFormData({
      ...formData,
      id_rak: event.target.value, // Set id_rak based on selected rak
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/detail-transaksi-barang", formData)
      .then((response) => {
        alert("Data berhasil ditambahkan!");
        // Redirect or reset form here
        setFormData({
          id_transaksi: "",
          id_barang: "",
          id_rak: "",
          jumlah_barang: "",
          satuan: "",
          harga_beli_satuan: "",
          tanggal_kadaluwarsa: "",
          status: "disimpan",
        });
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        alert("Terjadi kesalahan saat menambahkan data.");
      });
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

        {/* Main Content */}
        <main className="flex-1 p-4">
          <div className="bg-white p-6 shadow-lg rounded-lg mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Form Tambah Data
            </h1>
            <p className="text-gray-600">
              Isi data detail transaksi barang di sini.
            </p>
          </div>

          {/* Form Tambah Data */}
          <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                {/* Dropdown id_transaksi */}
                <div>
                  <label className="block text-gray-700">Transaksi</label>
                  <select
                    name="id_transaksi"
                    value={formData.id_transaksi}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  >
                    <option value="">Pilih Transaksi</option>
                    {transaksiOptions.map((transaksi) => (
                      <option
                        key={transaksi.id_transaksi}
                        value={transaksi.id_transaksi}
                      >
                        {transaksi.tanggal_transaksi}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dropdown id_barang */}
                <div>
                  <label className="block text-gray-700">Barang</label>
                  <select
                    name="id_barang"
                    value={formData.id_barang}
                    onChange={handleBarangChange} // Call handler when barang is selected
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  >
                    <option value="">Pilih Barang</option>
                    {barangOptions.map((barang) => (
                      <option key={barang.id_barang} value={barang.id_barang}>
                        {barang.nama_barang}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dropdown id_rak */}
                <div>
                  <label className="block text-gray-700">Rak</label>
                  <select
                    name="id_rak"
                    value={formData.id_rak}
                    onChange={handleRakChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  >
                    <option value="">Pilih Rak</option>
                    {rakOptions.map((rak) => (
                      <option key={rak.id_rak} value={rak.id_rak}>
                        {rak.nama_rak} {/* Tampilkan nama rak */}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Satuan input */}
                <div>
                  <label className="block text-gray-700">Satuan</label>
                  <input
                    type="text"
                    name="satuan"
                    value={formData.satuan}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    disabled // Disable because the satuan is set based on the selected barang
                  />
                </div>

                {/* Jumlah Barang */}
                <div>
                  <label className="block text-gray-700">Jumlah Barang</label>
                  <input
                    type="number"
                    name="jumlah_barang"
                    value={formData.jumlah_barang}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                  />
                </div>

                {/* Harga Beli Satuan */}
                <div>
                  <label className="block text-gray-700">
                    Harga Beli Satuan
                  </label>
                  <input
                    type="number"
                    name="harga_beli_satuan"
                    value={formData.harga_beli_satuan}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                  />
                </div>

                {/* Tanggal Kadaluwarsa */}
                <div>
                  <label className="block text-gray-700">
                    Tanggal Kadaluwarsa
                  </label>
                  <input
                    type="date"
                    name="tanggal_kadaluwarsa"
                    value={formData.tanggal_kadaluwarsa}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-gray-700">Status</label>
                  <input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    disabled
                  />
                </div>

                {/* Button Submit */}
                <div className="mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Tambah Data
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TambahDataForm;
