import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSupplier = () => {
  const [namaSupplier, setNamaSupplier] = useState("");
  const [email, setEmail] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [alamat, setAlamat] = useState("");
  const navigate = useNavigate(); // Gunakan navigate sebagai nama variabel yang lebih umum
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSupplier = {
      nama_supplier: namaSupplier,
      email: email,
      no_telp: noTelp,
      alamat: alamat,
    };

    try {
      // Mengirim data ke backend
      await axios.post("http://localhost:8000/suppliers", newSupplier);
      navigate("/gudang/supplier/dashboard"); // Redirect setelah berhasil
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add supplier.");
      console.error("Error adding supplier:", err);
    }
  };

  return (
    <div className="container">
      <h1>Add New Supplier</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Supplier Name</label>
          <input
            type="text"
            className="form-control"
            value={namaSupplier}
            onChange={(e) => setNamaSupplier(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            value={noTelp}
            onChange={(e) => setNoTelp(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea
            className="form-control"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success mt-3">
          Add Supplier
        </button>
      </form>
      {error && (
        <div className="alert alert-danger mt-3">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default AddSupplier;
