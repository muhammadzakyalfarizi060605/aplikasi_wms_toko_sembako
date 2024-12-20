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

// Bagian untuk data supplier
import DashboardSupplier from "./pages/gudang/supplier/Dashboard";
import CreateSupplier from "./pages/gudang/supplier/CreateSupplier";
import EditSupplier from "./pages/gudang/supplier/EditSupplier";
import ViewSupplier from "./pages/gudang/supplier/ViewSupplier";
// Bagian untuk data rack
import DashboardRack from "./pages/gudang/rack/Dashboard";
import CreateRack from "./pages/gudang/rack/CreateRack";
import ViewRack from "./pages/gudang/rack/ViewRack";
import EditRack from "./pages/gudang/rack/EditRack";
// Bagian untuk data product kategori
import DashboardProductCategories from "./pages/gudang/barang/kategori_barang/Dashboard";
import EditProductCategories from "./pages/gudang/barang/kategori_barang/EditProductCategories";
import CreateProductCategories from "./pages/gudang/barang/kategori_barang/CreateProductCategories";
import ViewProductCategories from "./pages/gudang/barang/kategori_barang/ViewProductCategories";

import JenisBarangDashboard from "./pages/gudang/barang/JenisBarang/Dashboard";
import JenisBarangAdd from "./pages/gudang/barang/JenisBarang/TambahBarang";
import JenisBarangEdit from "./pages/gudang/barang/JenisBarang/EditBarang";
import ShowBarang from "./pages/gudang/barang/JenisBarang/ShowBarang";
import TransaksiBarangDashboard from "./pages/gudang/transaksi_barang/Dashboard";
import TransaksiBarangAdd from "./pages/gudang/transaksi_barang/TambahDataTransaksi";
import TransaksiBarangEdit from "./pages/gudang/transaksi_barang/EditTransaksi";
import TransaksiBarangDetail from "./pages/gudang/transaksi_barang/TransaksiDetail";
import DetailTransaksiBarangDashboard from "./pages/gudang/DetailTransaksiBarang/Dashboard";
import DetailTransaksiBarangAdd from "./pages/gudang/DetailTransaksiBarang/TambahDataForm";
import EditDetailTransaksi from "./pages/gudang/DetailTransaksiBarang/EditDetailFormTransaksi";
import DetailTransaksi from "./pages/gudang/DetailTransaksiBarang/DetailTransaksi";
import LaporanStok from "./pages/gudang/LaporanStok";
import TransaksiPenjualanDashboard from "./pages/kasir/transaksi_penjualan/TransaksiPenjualan/Dashboard";
import TransaksiPenjualanAdd from "./pages/kasir/transaksi_penjualan/TransaksiPenjualan/TambahDataTransaksiPenjualan";
import TransaksiPenjualanEdit from "./pages/kasir/transaksi_penjualan/TransaksiPenjualan/EditDataTransaksiPenjualan";
import TransaksiPenjualanShow from "./pages/kasir/transaksi_penjualan/TransaksiPenjualan/DetailTransaksiPenjualan";
import DetailTransaksiPenjualanDashboard from "./pages/kasir/transaksi_penjualan/DetailTransaksiPenjualan/Dashboard";
import DetailTransaksiPenjualanAdd from "./pages/kasir/transaksi_penjualan/DetailTransaksiPenjualan/TambahDataDetailPenjualan";
import DetailTransaksiPenjualanEdit from "./pages/kasir/transaksi_penjualan/DetailTransaksiPenjualan/EditDataDetailPenjualan";
import DetailTransaksiPenjualanShow from "./pages/kasir/transaksi_penjualan/DetailTransaksiPenjualan/DetailDataPenjualan";
import DetailTransaksiPenjualanLaporan from "./pages/kasir/transaksi_penjualan/LaporanPenjualan";

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
        <Route
          path="/gudang/detail-transaksi-barang/edit-data/:id_detail"
          element={<EditDetailTransaksi />}
        />
        <Route
          path="kasir/detail-transaksi-penjualan/laporan_stok/dashboard"
          element={<DetailTransaksiPenjualanLaporan />}
        />
        <Route
          path="/kasir/detail-transaksi-penjualan/detail-data/:id"
          element={<DetailTransaksiPenjualanShow />}
        />
        <Route
          path="/edit-transaksi-penjualan/:id"
          element={<DetailTransaksiPenjualanEdit />}
        />
        <Route
          path="/kasir/detail-transaksi-penjualan/tambah-data"
          element={<DetailTransaksiPenjualanAdd />}
        />
        <Route
          path="/kasir/detail-transaksi-barang/dashboard"
          element={<DetailTransaksiPenjualanDashboard />}
        />
        <Route
          path="/kasir/transaksi-penjualan/tambah-data"
          element={<TransaksiPenjualanAdd />}
        />
        <Route
          path="/kasir/transaksi-penjualan/detail-data/:id"
          element={<TransaksiPenjualanShow />}
        />
        <Route
          path="/kasir/transaksi-penjualan/edit-data/:id"
          element={<TransaksiPenjualanEdit />}
        />
        <Route
          path="/kasir/transaksi-penjualan/dashboard"
          element={<TransaksiPenjualanDashboard />}
        />
        <Route path="/laporan_stok/dashboard" element={<LaporanStok />} />
        <Route
          path="/detail-transaksi-barang/:id_detail"
          element={<DetailTransaksi />}
        />

        {/* Rute login */}
        <Route path="/" element={<LoginPage setUser={handleLogin} />} />

        <Route
          path="/gudang/detail-transaksi-barang/edit-data/:id_detail"
          element={<EditDetailTransaksi />}
        />

        {/* Rute yang tidak memerlukan autentikasi */}
        <Route path="/edit-transaksi/:id" element={<TransaksiBarangEdit />} />

        <Route
          path="/transaksi-barang/create"
          element={<TransaksiBarangAdd />}
        />
        <Route
          path="/gudang/detail-transaksi-barang/dashboard"
          element={<DetailTransaksiBarangDashboard />}
        />

        <Route
          path="/gudang/jenis-barang/dashboard"
          element={<JenisBarangDashboard />}
        />
        <Route
          path="/gudang/jenis-barang/tambah"
          element={<JenisBarangAdd />}
        />
        <Route
          path="/gudang/detail-transaksi-barang/tambah-data"
          element={<DetailTransaksiBarangAdd />}
        />

        <Route
          path="/gudang/barang/edit/:id_barang"
          element={<JenisBarangEdit />}
        />
        <Route path="/gudang/barang/show/:id_barang" element={<ShowBarang />} />
        <Route
          path="/gudang/transaksi-barang/dashboard"
          element={<TransaksiBarangDashboard />}
        />
        <Route
          path="/transaksi-barang/:id"
          element={<TransaksiBarangDetail />}
        />

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
        {/* Untuk Bagian Role Gudang */}
        <Route
          path="/gudang/dashboard"
          element={
            <PrivateRoute role="gudang">
              <GudangDashboard />
            </PrivateRoute>
          }
        />
        {/* Bagian Supplier */}
        <Route
          path="/gudang/supplier/dashboard"
          element={<DashboardSupplier />}
        />
        <Route path="/gudang/supplier/create" element={<CreateSupplier />} />
        <Route path="/gudang/supplier/edit/:id" element={<EditSupplier />} />
        <Route path="/gudang/supplier/view/:id" element={<ViewSupplier />} />
        {/* Bagian Rak */}
        <Route path="/gudang/rack/dashboard" element={<DashboardRack />} />
        <Route path="/gudang/rack/create" element={<CreateRack />} />
        <Route path="/gudang/rack/view/:id_rak" element={<ViewRack />} />
        <Route path="/gudang/rack/edit/:id_rak" element={<EditRack />} />
        {/* Bagian Kategori Barang */}
        <Route
          path="/gudang/product-categories/dashboard"
          element={<DashboardProductCategories />}
        />
        <Route
          path="/gudang/product-categories/edit/:id_kategori"
          element={<EditProductCategories />}
        />
        <Route
          path="/gudang/product-categories/create"
          element={<CreateProductCategories />}
        />
        <Route
          path="/gudang/product-categories/view/:id_kategori"
          element={<ViewProductCategories />}
        />

        {/* Supplier Dashboard Route */}

        {/* Redirect jika rute tidak valid */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
