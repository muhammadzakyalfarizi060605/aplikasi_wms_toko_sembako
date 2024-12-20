import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const EditKategori = () => {
  const navigate = useNavigate(); // Untuk navigasi
  const location = useLocation(); // Untuk mendapatkan ID dari URL
  const id = location.pathname.split("/").pop(); // Mengambil ID kategori dari URL

  const [kategori, setKategori] = useState({
    nama_kategori: "",
    deskripsi: "",
  });

  useEffect(() => {
    // Mendapatkan data kategori berdasarkan ID
    axios
      .get(`http://localhost:8000/api/kategori-barang/${id}`)
      .then((res) => {
        setKategori(res.data); // Mengatur data kategori yang diterima ke state
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKategori((prevKategori) => ({
      ...prevKategori,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mengirim data ke API untuk memperbarui kategori
    axios
      .put(`http://localhost:8000/api/kategori-barang/${id}`, kategori)
      .then(() => {
        // Menampilkan SweetAlert setelah berhasil update
        Swal.fire({
          title: "Berhasil!",
          text: "Kategori berhasil diperbarui.",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          // Setelah berhasil, arahkan kembali ke halaman dashboard
          navigate("/gudang/product-categories/dashboard");
        });
      })
      .catch((err) => {
        // Menampilkan SweetAlert jika terjadi error
        Swal.fire({
          title: "Gagal!",
          text: "Terjadi kesalahan saat memperbarui kategori.",
          icon: "error",
          confirmButtonText: "Coba Lagi",
        });
        console.error(err);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Kategori Barang</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nama Kategori</label>
          <input
            type="text"
            name="nama_kategori"
            value={kategori.nama_kategori}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Deskripsi</label>
          <textarea
            name="deskripsi"
            value={kategori.deskripsi}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default EditKategori;
