import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const EditTransaksiForm = () => {
  const { id } = useParams(); // Get the ID of the transaksi from the URL
  const navigate = useNavigate(); // Use navigate hook from React Router v6
  const [transaksi, setTransaksi] = useState({
    id_user: "",
    id_supplier: "",
    tanggal_transaksi: "",
  });
  const [users, setUsers] = useState([]); // List of users for the dropdown
  const [suppliers, setSuppliers] = useState([]); // List of suppliers for the dropdown

  useEffect(() => {
    // Fetch the transaksi data by ID
    axios
      .get(`http://localhost:8000/api/transaksi-barang/${id}`)
      .then((response) => {
        setTransaksi(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the transaksi data!", error);
      });

    // Fetch users and filter by role "gudang"
    axios.get("http://localhost:8000/api/users").then((response) => {
      // Filter users based on role
      const filteredUsers = response.data.filter(
        (user) => user.role === "gudang"
      );
      setUsers(filteredUsers);
    });

    // Fetch suppliers
    axios.get("http://localhost:8000/api/suppliers").then((response) => {
      setSuppliers(response.data);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaksi({
      ...transaksi,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8000/api/transaksi-barang/${id}`, transaksi)
      .then((response) => {
        // Success Alert using SweetAlert
        Swal.fire({
          title: "Success!",
          text: "Data updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/gudang/transaksi-barang/dashboard"); // Use navigate to redirect to transaksi list page
        });
      })
      .catch((error) => {
        // Error Alert using SweetAlert
        Swal.fire({
          title: "Error!",
          text: "There was an error updating the transaksi.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  return (
    <div className="container">
      <h1>Edit Transaksi</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id_user">User</label>
          <select
            id="id_user"
            name="id_user"
            className="form-control"
            value={transaksi.id_user}
            onChange={handleChange}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.nama_lengkap}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="id_supplier">Supplier</label>
          <select
            id="id_supplier"
            name="id_supplier"
            className="form-control"
            value={transaksi.id_supplier}
            onChange={handleChange}
          >
            <option value="">Select Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id_supplier} value={supplier.id_supplier}>
                {supplier.nama_supplier}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tanggal_transaksi">Tanggal Transaksi</label>
          <input
            type="date"
            id="tanggal_transaksi"
            name="tanggal_transaksi"
            className="form-control"
            value={transaksi.tanggal_transaksi}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Transaksi
        </button>
      </form>
    </div>
  );
};

export default EditTransaksiForm;
