import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";

const EditBarang = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [barang, setBarang] = useState({
    nama_barang: "",
    id_kategori: "",
    jumlah_stok: 0,
    satuan: "",
    harga_jual_persatuan: 0,
    gambar_barang: "", // Menggunakan string untuk menyimpan URL awal
  });
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const { id_barang } = useParams();

  // Fetch barang details and categories
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/barang/${id_barang}`)
      .then((response) => {
        setBarang(response.data);
        setImagePreview(
          `http://localhost:8000/storage/${response.data.gambar_barang}`
        );
      })
      .catch((error) => {
        console.error("Error fetching barang details:", error);
      });

    axios
      .get("http://localhost:8000/api/kategori-barang")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [id_barang]);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBarang((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBarang((prev) => ({ ...prev, gambar_barang: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama_barang", barang.nama_barang);
    formData.append("id_kategori", barang.id_kategori);
    formData.append("jumlah_stok", barang.jumlah_stok);
    formData.append("satuan", barang.satuan);
    formData.append("harga_jual_persatuan", barang.harga_jual_persatuan);

    if (barang.gambar_barang instanceof File) {
      formData.append("gambar_barang", barang.gambar_barang);
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/barang/${id_barang}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Barang berhasil diperbarui!");
      navigate("/gudang/barang");
    } catch (error) {
      console.error("Error updating barang:", error);
      alert("Gagal memperbarui barang!");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col">
        <Navbar
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <main className="flex-1 p-4">
          <div className="bg-white p-6 shadow-lg rounded-lg mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Edit Barang</h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 shadow-lg rounded-lg"
          >
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600">
                Nama Barang
              </label>
              <input
                type="text"
                name="nama_barang"
                value={barang.nama_barang}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600">
                Kategori
              </label>
              <select
                name="id_kategori"
                value={barang.id_kategori}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              >
                <option value="">Pilih Kategori</option>
                {categories.map((category) => (
                  <option
                    key={category.id_kategori}
                    value={category.id_kategori}
                  >
                    {category.nama_kategori}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600">
                Jumlah Stok
              </label>
              <input
                type="number"
                name="jumlah_stok"
                value={barang.jumlah_stok}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600">
                Satuan
              </label>
              <input
                type="text"
                name="satuan"
                value={barang.satuan}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600">
                Harga Jual Per Satuan
              </label>
              <input
                type="number"
                name="harga_jual_persatuan"
                value={barang.harga_jual_persatuan}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600">
                Gambar Barang
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-20 h-20 object-cover"
                />
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Update Barang
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditBarang;
