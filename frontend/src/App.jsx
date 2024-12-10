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

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Periksa localStorage untuk data user
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const PrivateRoute = ({ children, role }) => {
    // Periksa `localStorage` jika state user kosong
    const storedUser = user || JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      return <Navigate to="/" />; // Redirect ke halaman login jika tidak ada user
    }

    if (storedUser.role !== role) {
      return <Navigate to="/" />; // Redirect jika role tidak sesuai
    }

    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Rute login */}
        <Route path="/" element={<LoginPage setUser={setUser} />} />

        {/* Rute dengan autentikasi */}
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
              <div>
                <GudangDashboard />
              </div>
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
