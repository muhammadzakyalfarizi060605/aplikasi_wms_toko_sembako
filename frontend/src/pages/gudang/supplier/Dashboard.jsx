import React, { useState, useEffect } from "react";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../../index.css";

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // Mengambil data dari API
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/suppliers");
        setSuppliers(response.data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Main Dashboard Content */}
        <main className="flex-1 p-4 ">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard Supplier
            </h1>
            <p className="text-gray-600">
              This is where your main content goes.
            </p>
          </div>

          {/* Wrapper untuk tabel dengan overflow-x-auto */}
          <div className="container">
            <h1>Supplier Dashboard</h1>
            <Link to="/gudang/supplier/add" className="btn btn-primary">
              Add New Supplier
            </Link>
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Supplier Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier.id_supplier}>
                    <td>{supplier.id_supplier}</td>
                    <td>{supplier.nama_supplier}</td>
                    <td>{supplier.email}</td>
                    <td>{supplier.no_telp}</td>
                    <td>{supplier.alamat}</td>
                    <td>
                      <Link
                        to={`/gudang/supplier/show/${supplier.id_supplier}`}
                        className="btn btn-info"
                      >
                        Show
                      </Link>
                      <Link
                        to={`/gudang/supplier/edit/${supplier.id_supplier}`}
                        className="btn btn-warning"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
