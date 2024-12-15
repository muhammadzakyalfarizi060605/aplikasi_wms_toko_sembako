import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TambahTransaksi = () => {
  const [users, setUsers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [tanggalTransaksi, setTanggalTransaksi] = useState("");
  const navigate = useNavigate();

  // Fetch data User and Supplier from API
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users") // Ganti dengan API endpoint untuk User
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users data:", error);
      });

    axios
      .get("http://localhost:8000/api/suppliers") // Ganti dengan API endpoint untuk Supplier
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching suppliers data:", error);
      });
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaksi = {
      user_id: selectedUser, // Mengirim hanya id user
      supplier_id: selectedSupplier, // Mengirim hanya id_supplier
      tanggal_transaksi: tanggalTransaksi,
    };

    axios
      .post("http://localhost:8000/api/transaksi-barang", newTransaksi) // Ganti dengan API endpoint untuk menambah transaksi
      .then((response) => {
        alert("Data Transaksi berhasil ditambahkan!");
        navigate("/gudang/transaksi-barang/dashboard"); // Arahkan ke halaman dashboard setelah data berhasil ditambahkan
      })
      .catch((error) => {
        console.error("Error adding transaksi data:", error);
        alert("Terjadi kesalahan saat menambahkan data transaksi.");
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Tambah Transaksi Barang
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Pilih User</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">-- Pilih User --</option>
            {users.map((user) => (
              <option key={`user-${user.id}`} value={user.id}>
                {user.nama_lengkap}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Pilih Supplier</label>
          <select
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">-- Pilih Supplier --</option>
            {suppliers.map((supplier) => (
              <option
                key={`supplier-${supplier.id_supplier}`}
                value={supplier.id_supplier}
              >
                {supplier.nama_supplier}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Tanggal Transaksi</label>
          <input
            type="date"
            value={tanggalTransaksi}
            onChange={(e) => setTanggalTransaksi(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Tambah Transaksi
        </button>
      </form>
    </div>
  );
};

export default TambahTransaksi;
