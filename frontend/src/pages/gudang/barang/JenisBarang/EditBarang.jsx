import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBarangForm = () => {
  const { id_barang } = useParams(); // Mendapatkan ID barang dari URL
  const navigate = useNavigate(); // Untuk navigasi setelah berhasil update
  const [barang, setBarang] = useState({
    nama_barang: "",
    kategori_id: "",
    jumlah_stok: "",
    satuan: "",
    harga_jual_persatuan: "",
  });
  const [kategori, setKategori] = useState([]); // Menyimpan daftar kategori
  const [loading, setLoading] = useState(true);

  // Fetch data barang dan kategori saat komponen dimuat
  useEffect(() => {
    fetchBarang();
    fetchKategori();
  }, []);

  // Ambil data barang berdasarkan ID
  const fetchBarang = async () => {
    setLoading(true); // Set loading ke true sebelum memulai permintaan

    try {
      const response = await axios.get(
        `http://localhost:8000/api/barang/${id_barang}`
      );
      setBarang(response.data);
    } catch (error) {
      console.error("Error fetching barang data:", error);
      alert("Gagal memuat data barang.");
    } finally {
      setLoading(false); // Set loading ke false setelah permintaan selesai
    }
  };

  // Ambil daftar kategori
  const fetchKategori = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/kategori-barang"
      );
      setKategori(response.data);
    } catch (error) {
      console.error("Error fetching kategori data:", error);
      alert("Gagal memuat data kategori.");
    }
  };

  // Handle perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBarang({ ...barang, [name]: value });
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/barang/${id_barang}`,
        barang
      );
      if (response.data.status === "success") {
        alert("Data barang berhasil diperbarui.");
        navigate("/gudang/jenis-barang/dashboard"); // Kembali ke halaman dashboard barang
      } else {
        alert("Gagal memperbarui data barang: " + response.data.message);
      }
    } catch (error) {
      console.error("Error updating barang data:", error);
      alert("Terjadi kesalahan saat memperbarui data barang.");
    }
  };

  if (loading) {
    return <p>Memuat data...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Barang</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-lg"
      >
        {/* Nama Barang */}
        <div className="mb-4">
          <label
            htmlFor="nama_barang"
            className="block text-gray-700 font-bold mb-2"
          >
            Nama Barang
          </label>
          <input
            type="text"
            id="nama_barang"
            name="nama_barang"
            value={barang.nama_barang}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>

        {/* Kategori */}
        <div className="mb-4">
          <label
            htmlFor="kategori_id"
            className="block text-gray-700 font-bold mb-2"
          >
            Kategori
          </label>
          <select
            id="kategori_id"
            name="id_kategori"
            value={barang.id_kategori}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3"
            required
          >
            <option value="">Pilih Kategori</option>
            {kategori.map((item) => (
              <option key={item.id_kategori} value={item.id_kategori}>
                {item.nama_kategori}
              </option>
            ))}
          </select>
        </div>

        {/* Jumlah Stok */}
        <div className="mb-4">
          <label
            htmlFor="jumlah_stok"
            className="block text-gray-700 font-bold mb-2"
          >
            Jumlah Stok
          </label>
          <input
            type="number"
            id="jumlah_stok"
            name="jumlah_stok"
            value={barang.jumlah_stok}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>

        {/* Satuan */}
        <div className="mb-4">
          <label
            htmlFor="satuan"
            className="block text-gray-700 font-bold mb-2"
          >
            Satuan
          </label>
          <input
            type="text"
            id="satuan"
            name="satuan"
            value={barang.satuan}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>

        {/* Harga Jual */}
        <div className="mb-4">
          <label
            htmlFor="harga_jual_persatuan"
            className="block text-gray-700 font-bold mb-2"
          >
            Harga Jual
          </label>
          <input
            type="number"
            id="harga_jual_persatuan"
            name="harga_jual_persatuan"
            value={barang.harga_jual_persatuan}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>

        {/* Tombol Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBarangForm;
