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
    nama_barang: "",
    id_rak: "",
    jumlah_barang: 0,
    satuan: "",
    harga_beli_satuan: 0,
    tanggal_kadaluwarsa: "",
    status: "disimpan", // Default status
    id_rak_tujuan: "",
  });
  const [rakOptions, setRakOptions] = useState([]);
  const [barangOptions, setBarangOptions] = useState([]);
  const navigate = useNavigate();
  const { id_detail } = useParams();

  useEffect(() => {
    const fetchRakOptions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/rak");
        setRakOptions(response.data);
      } catch (error) {
        console.error("Error fetching rak options:", error);
      }
    };

    const fetchBarangOptions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/barang");
        const barangData = response.data;

        setBarangOptions(barangData);

        if (formData.id_barang) {
          const selectedBarang = barangData.find(
            (barang) => barang.id_barang === formData.id_barang
          );
          if (selectedBarang) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              nama_barang: selectedBarang.nama_barang,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching barang options:", error);
      }
    };

    const fetchDetail = async () => {
      if (id_detail) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/detail-transaksi-barang/${id_detail}`
          );
          const detail = response.data.detail;

          setFormData((prevFormData) => ({
            ...prevFormData,
            ...detail,
            status: detail.id_rak_tujuan ? "dipindahkan" : "disimpan", // Atur status berdasarkan id_rak_tujuan
          }));
        } catch (error) {
          console.error("Error fetching detail:", error);
        }
      }
    };

    fetchRakOptions();
    fetchBarangOptions();
    fetchDetail();
  }, [id_detail]);

  const handleSubmit = (e) => {
    e.preventDefault();

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
        navigate("/gudang/detail-transaksi-barang");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Terjadi kesalahan saat menyimpan data.");
      });
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
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">
              {id_detail ? "Edit" : "Tambah"} Detail Transaksi Barang
            </h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div className="flex flex-col mb-4">
                <label className="block text-sm font-medium">
                  Tanggal Transaksi
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  value={formData.tanggal_transaksi || ""}
                  readOnly
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="block text-sm font-medium">Nama Barang</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  value={formData.nama_barang || "Data tidak tersedia"}
                  readOnly
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="block text-sm font-medium">Rak</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  value={
                    rakOptions.find((rak) => rak.id_rak === formData.id_rak)
                      ?.nama_rak || ""
                  }
                  readOnly
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="block text-sm font-medium">
                  Jumlah Barang
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  value={formData.jumlah_barang}
                  onChange={(e) =>
                    setFormData({ ...formData, jumlah_barang: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="block text-sm font-medium">Satuan</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  value={formData.satuan}
                  readOnly
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="block text-sm font-medium">
                  Harga Beli Satuan
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  value={formData.harga_beli_satuan}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      harga_beli_satuan: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="block text-sm font-medium">
                  Tanggal Kadaluwarsa
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  value={formData.tanggal_kadaluwarsa}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tanggal_kadaluwarsa: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="block text-sm font-medium">Status</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  value={
                    formData.status === "disimpan" ? "Disimpan" : "Dipindah"
                  }
                  readOnly
                />
              </div>

              {formData.status === "dipindahkan" && (
                <div className="flex flex-col mb-4 col-span-2">
                  <label className="block text-sm font-medium">
                    Rak Tujuan
                  </label>
                  <select
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    value={formData.id_rak_tujuan}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        id_rak_tujuan: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Pilih Rak</option>
                    {rakOptions.map((rak) => (
                      <option key={rak.id_rak} value={rak.id_rak}>
                        {rak.nama_rak}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="col-span-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
export default FormDetailTransaksi;
