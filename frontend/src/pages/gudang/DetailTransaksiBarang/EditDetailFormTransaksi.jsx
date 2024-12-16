import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import Sidebar from "../layouts/Sidebar";
import axios from "axios";

const FormDetailTransaksi = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    id_transaksi: "",
    id_barang: "",
    id_rak: "",
    nama_barang: "",
    tanggal_transaksi: "",
    id_rak_tujuan: "",
    jumlah_barang: "",
    satuan: "", // Menyimpan nama satuan
    harga_beli_satuan: "",
    tanggal_kadaluwarsa: "",
    status: "disimpan", // Status default
  });
  const [rakOptions, setRakOptions] = useState([]);
  const [barangOptions, setBarangOptions] = useState([]);
  const [transaksiOptions, setTransaksiOptions] = useState([]);
  const navigate = useNavigate();
  const { id_detail } = useParams();

  useEffect(() => {
    // Fungsi untuk mengambil data rak
    const fetchRakOptions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/rak");
        setRakOptions(response.data); // Menyimpan data rak dalam state rakOptions
      } catch (error) {
        console.error("Error fetching rak options:", error);
      }
    };

    // Fungsi untuk mengambil data barang
    const fetchBarangOptions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/barang");
        const barangData = response.data;
        setBarangOptions(barangData);

        console.log("Barang Data:", barangData);
        console.log(
          "ID Barang di FormData sebelum update:",
          formData.id_barang
        );

        if (formData.id_barang) {
          const selectedBarang = barangData.find(
            (barang) => barang.id_barang === formData.id_barang
          );
          console.log("Selected Barang:", selectedBarang);

          if (selectedBarang) {
            setFormData((prevFormData) => {
              console.log("FormData sebelum update:", prevFormData);
              return {
                ...prevFormData,
                satuan: selectedBarang.satuan,
                nama_barang: selectedBarang.nama_barang,
              };
            });
          }
        }
      } catch (error) {
        console.error("Error fetching barang options:", error);
      }
    };

    // Fungsi untuk mengambil data transaksi barang
    const fetchTransaksiOptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/transaksi-barang"
        );
        setTransaksiOptions(response.data);

        // Jika id_transaksi sudah ada, set tanggal_transaksi dari data yang dipilih
        if (formData.id_transaksi) {
          const selectedTransaksi = response.data.find(
            (transaksi) => transaksi.id_transaksi === formData.id_transaksi
          );
          if (selectedTransaksi) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              tanggal_transaksi: selectedTransaksi.tanggal_transaksi, // Pastikan data ini ada
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching transaksi options:", error);
      }
    };

    // Fungsi untuk mengambil data detail transaksi barang
    const fetchDetail = async () => {
      if (id_detail) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/detail-transaksi-barang/${id_detail}`
          );
          const detail = response.data.detail;

          // Update formData sesuai dengan data detail dan status berdasarkan id_rak_tujuan
          setFormData((prevFormData) => ({
            ...prevFormData,
            ...detail,
            status: detail.id_rak_tujuan ? "dipindahkan" : "disimpan", // Tentukan status berdasarkan id_rak_tujuan
          }));
        } catch (error) {
          console.error("Error fetching detail:", error);
        }
      }
    };

    // Memanggil semua fungsi untuk mengambil data
    fetchRakOptions();
    fetchBarangOptions();
    fetchTransaksiOptions();
    fetchDetail();
  }, [id_detail, formData.id_barang, formData.id_transaksi]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Data Form Yang dikirim :", formData);

    const request = id_detail
      ? axios.put(
          `http://localhost:8000/api/detail-transaksi-barang/${id_detail}`,
          formData
        )
      : axios.post(
          "http://localhost:8000/api/detail-transaksi-barang",
          formData
        );

    request
      .then((response) => {
        alert(response.data.message);
        navigate("/gudang/detail-transaksi-barang/dashboard");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Terjadi kesalahan saat menyimpan data.");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nama Barang
          </label>
          <input
            type="text"
            value={formData.id_barang ? formData.nama_barang : ""}
            readOnly
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Tanggal Transaksi
          </label>
          <input
            type="text"
            value={formData.id_transaksi ? formData.tanggal_transaksi : ""}
            readOnly
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nama Rak
          </label>
          <input
            type="text"
            value={formData.id_rak ? formData.nama_rak : ""}
            readOnly
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Jumlah Barang
          </label>
          <input
            type="number"
            value={formData.jumlah_barang}
            onChange={(e) =>
              setFormData({ ...formData, jumlah_barang: e.target.value })
            }
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Satuan
          </label>
          <input
            type="text"
            value={formData.satuan}
            readOnly
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Harga Beli Satuan
          </label>
          <input
            type="number"
            value={formData.harga_beli_satuan}
            onChange={(e) =>
              setFormData({ ...formData, harga_beli_satuan: e.target.value })
            }
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Tanggal Kadaluarsa
          </label>
          <input
            type="date"
            value={formData.tanggal_kadaluwarsa}
            onChange={(e) =>
              setFormData({ ...formData, tanggal_kadaluwarsa: e.target.value })
            }
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="mt-1 p-2 w-full border rounded"
          >
            <option value="disimpan">Disimpan</option>
            <option value="dipindahkan">Dipindahkan</option>
          </select>
        </div>

        {formData.status === "dipindahkan" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Lokasi Rak Tujuan
            </label>
            <select
              value={formData.id_rak_tujuan}
              onChange={(e) =>
                setFormData({ ...formData, id_rak_tujuan: e.target.value })
              }
              className="mt-1 p-2 w-full border rounded"
            >
              <option value="">Pilih Rak Tujuan</option>
              {rakOptions.map((rak) => (
                <option key={rak.id_rak} value={rak.id_rak}>
                  {rak.nama_rak}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {id_detail ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default FormDetailTransaksi;
