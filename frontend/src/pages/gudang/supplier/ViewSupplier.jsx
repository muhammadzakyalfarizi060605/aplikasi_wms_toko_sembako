import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SupplierShow = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/suppliers/${id}`
        );
        setSupplier(response.data);
      } catch (error) {
        console.error("Error fetching supplier:", error);
      }
    };

    fetchSupplier();
  }, [id]);

  if (!supplier) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Detail Supplier</h2>
      <p>
        <strong>ID Supplier:</strong> {supplier.id_supplier}
      </p>
      <p>
        <strong>Nama Supplier:</strong> {supplier.nama_supplier}
      </p>
      <p>
        <strong>Alamat:</strong> {supplier.alamat}
      </p>
      <p>
        <strong>Telepon:</strong> {supplier.no_telp}
      </p>
      {/* Tampilkan data lainnya sesuai kebutuhan */}
    </div>
  );
};

export default SupplierShow;
