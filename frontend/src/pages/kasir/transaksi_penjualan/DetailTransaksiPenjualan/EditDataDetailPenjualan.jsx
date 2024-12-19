import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../layouts/Sidebar";
import Navbar from "../../layouts/Navbar";

const EditDetailTransaksiForm = () => {
  const { id } = useParams(); // Mendapatkan id dari parameter URL
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [penjualan, setPenjualan] = useState([]);
  const [barang, setBarang] = useState([]);
  const [formData, setFormData] = useState({
    id_penjualan: "",
    id_barang: "",
    harga_jual_persatuan: "",
    jumlah_barang: 1,
    subtotal: 0,
  });

  // Fetch data penjualan dan barang
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/transaksi-penjualan")
      .then((response) => {
        setPenjualan(response.data);
      });
    axios.get("http://127.0.0.1:8000/api/barang").then((response) => {
      setBarang(response.data);
    });
  }, []);

  // Fetch data detail transaksi berdasarkan id
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/detail-transaksi-penjualan/${id}`)
      .then((response) => {
        const data = response.data;
        setFormData(data); // Isi formData dengan data dari API
        // Hitung subtotal pertama kali berdasarkan harga jual dan jumlah barang
        calculateSubtotal(data.jumlah_barang, data.harga_jual_persatuan);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  // Fungsi untuk menghitung subtotal
  const calculateSubtotal = (jumlah_barang, harga_jual_persatuan) => {
    const subtotal = jumlah_barang * harga_jual_persatuan;
    setFormData((prevState) => ({
      ...prevState,
      subtotal: subtotal,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update data jumlah_barang jika diubah dan hitung subtotal baru
    if (name === "jumlah_barang") {
      const newJumlahBarang = parseInt(value, 10) || 0;

      // Ambil stok barang yang sesuai dengan id_barang
      const selectedBarang = barang.find(
        (item) => item.id_barang === formData.id_barang
      );

      // Jika jumlah barang melebihi stok, beri notifikasi dan atur kembali jumlah_barang
      if (selectedBarang && newJumlahBarang > selectedBarang.jumlah_stok) {
        alert("Jumlah barang melebihi stok yang tersedia!");
        setFormData((prevState) => ({
          ...prevState,
          jumlah_barang: selectedBarang.jumlah_stok, // Set jumlah_barang ke stok yang tersedia
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          jumlah_barang: newJumlahBarang,
        }));
        calculateSubtotal(newJumlahBarang, formData.harga_jual_persatuan);
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update data ke API
    axios
      .put(
        `http://127.0.0.1:8000/api/detail-transaksi-penjualan/${id}`,
        formData
      )
      .then(() => {
        alert("Data berhasil diperbarui.");
        navigate("/kasir/detail-transaksi-barang/dashboard"); // Redirect ke halaman dashboard setelah update
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        alert("Terjadi kesalahan saat memperbarui data.");
      });
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Form Edit */}
        <main className="flex-1 p-4">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Edit Detail Transaksi</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="id_penjualan"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Nama Pembeli
                </label>
                <input
                  type="text"
                  id="id_penjualan"
                  name="id_penjualan"
                  value={
                    penjualan.find(
                      (item) => item.id_penjualan === formData.id_penjualan
                    )?.nama_pembeli || ""
                  }
                  readOnly
                  className="w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="id_barang"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Nama Barang
                </label>
                <input
                  type="text"
                  id="id_barang"
                  name="id_barang"
                  value={
                    barang.find((item) => item.id_barang === formData.id_barang)
                      ?.nama_barang || ""
                  }
                  readOnly
                  className="w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="harga_jual_persatuan"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Harga Jual Persatuan
                </label>
                <input
                  type="text"
                  id="harga_jual_persatuan"
                  name="harga_jual_persatuan"
                  value={formData.harga_jual_persatuan}
                  readOnly
                  className="w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="jumlah_barang"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Jumlah Barang
                </label>
                <input
                  type="number"
                  id="jumlah_barang"
                  name="jumlah_barang"
                  value={formData.jumlah_barang}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="subtotal"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Subtotal
                </label>
                <input
                  type="text"
                  id="subtotal"
                  name="subtotal"
                  value={formData.subtotal}
                  readOnly
                  className="w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
              >
                Simpan Perubahan
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditDetailTransaksiForm;
