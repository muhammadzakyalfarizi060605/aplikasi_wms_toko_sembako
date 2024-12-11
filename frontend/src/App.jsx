import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import KasirDashboard from "./pages/kasir/KasirDashboard";
import GudangDashboard from "./pages/gudang/GudangDashboard";
import SupplierDashboard from "./pages/gudang/supplier/Dashboard";
import AddSupplier from "./pages/gudang/supplier/AddSupplier";
import EditSupplier from "./pages/gudang/supplier/EditSupplier";
import ShowSupplier from "./pages/gudang/supplier/ShowSupplier";
import RakSupplier from "./pages/gudang/rak/Dashboard";
import AddRak from "./pages/gudang/rak/AddRak";
import ShowRak from "./pages/gudang/rak/ShowPage";
import EditRak from "./pages/gudang/rak/EditPage";

const App = () => {
  const [user, setUser] = useState(null);

  // Fungsi untuk memuat user dari localStorage saat pertama kali aplikasi dimulai
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData)); // Jika ada data, set user ke state
    }
  }, []);

  // Fungsi untuk login dan menyimpan data user ke localStorage
  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData)); // Simpan user ke localStorage
    setUser(userData); // Set user ke state
  };

  // PrivateRoute untuk memastikan hanya user dengan role tertentu yang bisa mengakses halaman
  const PrivateRoute = ({ children, role }) => {
    if (!user) {
      return <Navigate to="/" />; // Arahkan ke halaman login jika user belum ada
    }

    if (user.role !== role) {
      return <Navigate to="/" />; // Jika role tidak sesuai, arahkan ke login
    }

    return children; // Jika user dan role sesuai, tampilkan komponen anak
  };

  return (
    <Router>
      <Routes>
        {/* Rute login */}
        <Route path="/" element={<LoginPage setUser={handleLogin} />} />

        {/* Rute yang tidak memerlukan autentikasi */}
        <Route
          path="/gudang/dashboard/supplier/add-supplier"
          element={<AddSupplier />}
        />
        <Route path="/edit-supplier/:id" element={<EditSupplier />} />
        <Route path="/show-supplier/:id" element={<ShowSupplier />} />
        <Route path="/gudang/rak/dashboard" element={<RakSupplier />} />
        <Route path="/gudang/rak/add-rak" element={<AddRak />} />
        {/* Routing untuk halaman detail rak */}
        <Route path="/show-rak/:id_rak" element={<ShowRak />} />
        <Route path="/gudang/rak/edit-rak/:id_rak" element={<EditRak />} />

        {/* Rute yang memerlukan autentikasi */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/kasir/dashboard"
          element={
            <PrivateRoute role="kasir">
              <KasirDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/gudang/dashboard"
          element={
            <PrivateRoute role="gudang">
              <GudangDashboard />
            </PrivateRoute>
          }
        />

        {/* Supplier Dashboard Route */}
        <Route
          path="/gudang/supplier/dashboard"
          element={
            <PrivateRoute role="gudang">
              <SupplierDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/gudang/supplier/add"
          element={
            <PrivateRoute role="gudang">
              <AddSupplier />
            </PrivateRoute>
          }
        />

        {/* Redirect jika rute tidak valid */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
