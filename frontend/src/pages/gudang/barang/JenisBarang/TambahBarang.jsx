import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const TambahBarang = () => {
  const [kategoriList, setKategoriList] = useState([]); // Untuk menyimpan data kategori
  const [namaBarang, setNamaBarang] = useState("");
  const [idKategori, setIdKategori] = useState("");
  const [jumlahStok, setJumlahStok] = useState(0); // Set default to 0
  const [satuan, setSatuan] = useState("");
  const [hargaJual, setHargaJual] = useState("");
  const [gambarBarang, setGambarBarang] = useState(null);
  const navigate = useNavigate();

  // Fetch kategori data dari API
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/kategori-barang")
      .then((response) => {
        setKategoriList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching kategori data:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama_barang", namaBarang);
    formData.append("id_kategori", idKategori);
    formData.append("jumlah_stok", jumlahStok);
    formData.append("satuan", satuan);
    formData.append("harga_jual_persatuan", hargaJual);
    formData.append("gambar_barang", gambarBarang);

    // Kirim data ke API Laravel
    axios
      .post("http://localhost:8000/api/barang", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Swal.fire({
          title: "Sukses!",
          text: "Barang berhasil ditambahkan.",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/gudang/jenis-barang/dashboard"); // Redirect ke dashboard setelah sukses
      })
      .catch((error) => {
        console.error("Error adding barang:", error);
        Swal.fire({
          title: "Gagal!",
          text: "Gagal menambahkan barang. Silakan coba lagi.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Tambah Barang</h1>

        <form onSubmit={handleSubmit}>
          {/* Input Nama Barang */}
          <div className="mb-4">
            <label className="block text-gray-700">Nama Barang</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded"
              value={namaBarang}
              onChange={(e) => setNamaBarang(e.target.value)}
              required
            />
          </div>

          {/* Dropdown Kategori */}
          <div className="mb-4">
            <label className="block text-gray-700">Kategori Barang</label>
            <select
              className="w-full border px-4 py-2 rounded"
              value={idKategori}
              onChange={(e) => setIdKategori(e.target.value)}
              required
            >
              <option value="">Pilih Kategori</option>
              {kategoriList.map((kategori) => (
                <option key={kategori.id_kategori} value={kategori.id_kategori}>
                  {kategori.nama_kategori}
                </option>
              ))}
            </select>
          </div>

          {/* Input Jumlah Stok */}
          <div className="mb-4">
            <label className="block text-gray-700">Jumlah Stok</label>
            <input
              type="number"
              className="w-full border px-4 py-2 rounded"
              value={jumlahStok}
              onChange={(e) => setJumlahStok(e.target.value)}
              readOnly // Make it readonly
            />
          </div>

          {/* Input Satuan */}
          <div className="mb-4">
            <label className="block text-gray-700">Satuan</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded"
              value={satuan}
              onChange={(e) => setSatuan(e.target.value)}
              required
            />
          </div>

          {/* Input Harga Jual */}
          <div className="mb-4">
            <label className="block text-gray-700">Harga Jual</label>
            <input
              type="number"
              className="w-full border px-4 py-2 rounded"
              value={hargaJual}
              onChange={(e) => setHargaJual(e.target.value)}
              required
            />
          </div>

          {/* Input Gambar */}
          <div className="mb-4">
            <label className="block text-gray-700">Upload Gambar</label>
            <input
              type="file"
              className="w-full border px-4 py-2 rounded"
              onChange={(e) => setGambarBarang(e.target.files[0])}
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Tambah Barang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahBarang;
