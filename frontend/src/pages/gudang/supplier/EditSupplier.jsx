import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditSupplier = () => {
  const { id } = useParams(); // Ambil id dari URL
  const [supplier, setSupplier] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Mengambil data supplier berdasarkan id
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/suppliers/${id}`
        );
        setSupplier(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching supplier data:", error);
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/suppliers/${id}`,
        supplier
      );
      console.log("Response:", response); // Lihat respons server
      Swal.fire({
        title: "Success!",
        text: "Supplier updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/gudang/supplier/dashboard"); // Setelah edit berhasil, redirect ke Dashboard
    } catch (error) {
      console.error(
        "Error updating supplier:",
        error.response ? error.response.data : error.message
      );
      Swal.fire({
        title: "Error!",
        text: "There was an error updating the supplier.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Supplier</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nama
          </label>
          <input
            type="text"
            value={supplier.nama_supplier}
            onChange={(e) =>
              setSupplier({ ...supplier, nama_supplier: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={supplier.email}
            onChange={(e) =>
              setSupplier({ ...supplier, email: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            No. Telp
          </label>
          <input
            type="tel"
            value={supplier.no_telp}
            onChange={(e) =>
              setSupplier({ ...supplier, no_telp: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Alamat
          </label>
          <input
            type="text"
            value={supplier.alamat}
            onChange={(e) =>
              setSupplier({ ...supplier, alamat: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default EditSupplier;
