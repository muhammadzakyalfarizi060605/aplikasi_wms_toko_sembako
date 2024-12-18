import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TambahTransaksi = () => {
  const [kasir, setKasir] = useState([]);
  const [namaPembeli, setNamaPembeli] = useState("");
  const [totalHarga, setTotalHarga] = useState(0);
  const [diskon, setDiskon] = useState(0);
  const [hargaSetelahDiskon, setHargaSetelahDiskon] = useState(0);
  const [kasirId, setKasirId] = useState("");

  const navigate = useNavigate();

  // Ambil data user dengan role kasir
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users?role=kasir") // API endpoint untuk mengambil kasir
      .then((response) => {
        console.log("Kasir data fetched successfully:", response.data);

        setKasir(response.data); // Menyimpan data kasir
      })
      .catch((error) => {
        console.error("There was an error fetching the kasir data!", error);
      });
  }, []);

  const handleDiskonChange = (e) => {
    const diskonValue = e.target.value;
    setDiskon(diskonValue);
    setHargaSetelahDiskon(totalHarga - (totalHarga * diskonValue) / 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      nama_pembeli: namaPembeli,
      total_harga: totalHarga,
      diskon: diskon,
      harga_setelah_diskon: hargaSetelahDiskon,
      kasir_id: kasirId,
      tanggal_penjualan: new Date().toISOString(), // Menambahkan tanggal dan waktu transaksi
    };

    axios
      .post("http://localhost:8000/api/transaksi-penjualan", data)
      .then((response) => {
        alert("Data transaksi berhasil ditambahkan!");
        navigate("/kasir/transaksi-penjualan/dashboard");
      })
      .catch((error) => {
        console.error("There was an error submitting the data!", error);
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Form Tambah Transaksi</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Kasir
          </label>
          <select
            className="mt-1 block w-full"
            onChange={(e) => setKasirId(e.target.value)}
            required
          >
            <option value="">Pilih Kasir</option>
            {kasir.length > 0 ? (
              kasir.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.nama_lengkap}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Tidak ada kasir tersedia
              </option>
            )}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nama Pembeli
          </label>
          <input
            type="text"
            value={namaPembeli}
            onChange={(e) => setNamaPembeli(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Masukkan nama pembeli"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Total Harga
          </label>
          <input
            type="number"
            value={totalHarga}
            onChange={(e) => setTotalHarga(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Masukkan total harga"
            required
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Diskon (%)
          </label>
          <input
            type="number"
            value={diskon}
            onChange={handleDiskonChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Masukkan diskon persen"
            min="0"
            max="100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Harga Setelah Diskon
          </label>
          <input
            type="number"
            value={hargaSetelahDiskon}
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Simpan Transaksi
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahTransaksi;
