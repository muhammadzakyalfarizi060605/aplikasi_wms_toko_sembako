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
import KategoriBarangDashboard from "./pages/gudang/barang/KategoriBarang/Dashboard";
import KategoriBarangEdit from "./pages/gudang/barang/KategoriBarang/KategoriBarangEdit";
import KategoriBarangAdd from "./pages/gudang/barang/KategoriBarang/KategoriBarangAdd";
import KategoriBarangShow from "./pages/gudang/barang/KategoriBarang/ShowKategoriBarang";
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
          path="/gudang/dashboard/supplier/add-supplier"
          element={<AddSupplier />}
        />
        <Route
          path="/transaksi-barang/create"
          element={<TransaksiBarangAdd />}
        />
        <Route
          path="/gudang/detail-transaksi-barang/dashboard"
          element={<DetailTransaksiBarangDashboard />}
        />
        <Route path="/edit-supplier/:id" element={<EditSupplier />} />
        <Route path="/show-supplier/:id" element={<ShowSupplier />} />
        <Route path="/gudang/rak/dashboard" element={<RakSupplier />} />
        <Route path="/gudang/rak/add-rak" element={<AddRak />} />
        {/* Routing untuk halaman detail rak */}
        <Route path="/show-rak/:id_rak" element={<ShowRak />} />
        <Route path="/gudang/rak/edit-rak/:id_rak" element={<EditRak />} />
        <Route
          path="/gudang/kategori-barang/dashboard"
          element={<KategoriBarangDashboard />}
        />
        <Route
          path="/gudang/kategori-barang/edit/:id_kategori"
          element={<KategoriBarangEdit />}
        />
        <Route
          path="/gudang/kategori-barang/add"
          element={<KategoriBarangAdd />}
        />
        <Route
          path="/gudang/kategori-barang/show/:id"
          element={<KategoriBarangShow />}
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
