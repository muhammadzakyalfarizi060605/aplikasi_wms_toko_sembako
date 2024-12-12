import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TambahBarang = () => {
  const [formData, setFormData] = useState({
    id_kategori: "",
    nama_barang: "",
    gambar_barang: null,
    jumlah_stok: "",
    satuan: "",
    harga_jual_persatuan: "",
  });

  const navigate = useNavigate(); // Untuk navigasi

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/kategori-barang").then((response) => {
      setCategories(response.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, gambar_barang: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    axios
      .post("http://localhost:8000/api/barang", data)
      .then(() => alert("Barang berhasil ditambahkan!"))
      .catch((error) => console.error("Error adding barang:", error));
    navigate("/gudang/jenis-barang/dashboard"); // Navigasi ke dashboard setelah berhasil menambahkan barang
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tambah Barang</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Kategori</label>
          <select
            name="id_kategori"
            value={formData.id_kategori}
            onChange={handleChange}
            className="border px-2 py-1"
          >
            <option value="">Pilih Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id_kategori} value={cat.id_kategori}>
                {cat.nama_kategori}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block">Nama Barang</label>
          <input
            type="text"
            name="nama_barang"
            value={formData.nama_barang}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>
        <div>
          <label className="block">Gambar Barang</label>
          <input
            type="file"
            name="gambar_barang"
            onChange={handleFileChange}
            className="border px-2 py-1"
          />
        </div>
        <div>
          <label className="block">Jumlah Stok</label>
          <input
            type="number"
            name="jumlah_stok"
            value={formData.jumlah_stok}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>
        <div>
          <label className="block">Satuan</label>
          <input
            type="text"
            name="satuan"
            value={formData.satuan}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>
        <div>
          <label className="block">Harga Jual Persatuan</label>
          <input
            type="number"
            name="harga_jual_persatuan"
            value={formData.harga_jual_persatuan}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Tambah
        </button>
      </form>
    </div>
  );
};

export default TambahBarang;
