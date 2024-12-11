import { useState } from "react"; // Mengimpor useState
import { Link } from "react-router-dom"; // Pastikan mengimpor Link

function Sidebar({ isCollapsed, toggleSidebar }) {
  const [clicked, setClicked] = useState(null); // Gunakan null untuk menandakan tidak ada yang diklik

  const handleClick = (index) => {
    setClicked(index); // Set clicked untuk item yang diklik
  };

  return (
    <aside
      className={`transition-all bg-gray-800 text-white ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-3 text-center">
          <h1 className="text-2xl font-extrabold">
            {isCollapsed ? "WP" : "WarungPro"}
          </h1>
        </div>
        <ul className="mt-4 space-y-4 flex-1">
          {/* Home Menu */}
          <li>
            <Link
              to="/gudang/dashboard"
              className={`flex items-center font-extrabold ml-2 p-3 rounded-tl-xl rounded-bl-xl ${
                clicked === 0
                  ? "bg-white text-black"
                  : "hover:bg-white hover:text-black"
              }`}
              onClick={() => handleClick(0)} // Menandakan item yang diklik
            >
              <span className="text-lg">🏠</span>
              {!isCollapsed && <span className="ml-6">Home</span>}
            </Link>
          </li>

          {/* Supplier Menu */}
          <li>
            <Link
              to="/gudang/supplier/dashboard"
              className={`flex items-center font-extrabold ml-2 p-3 rounded-tl-xl rounded-bl-xl ${
                clicked === 1
                  ? "bg-white text-black"
                  : "hover:bg-white hover:text-black"
              }`}
              onClick={() => handleClick(1)} // Menandakan item yang diklik
            >
              <span className="text-lg">📦</span>
              {!isCollapsed && <span className="ml-6">Supplier</span>}
            </Link>
          </li>

          {/* Rak Menu */}
          <li>
            <Link
              to="/gudang/rak/dashboard"
              className={`flex items-center font-extrabold ml-2 p-3 rounded-tl-xl rounded-bl-xl ${
                clicked === 2
                  ? "bg-white text-black"
                  : "hover:bg-white hover:text-black"
              }`}
              onClick={() => handleClick(2)} // Menandakan item yang diklik
            >
              <span className="text-lg">🗂️</span>
              {!isCollapsed && <span className="ml-6">Rak</span>}
            </Link>
          </li>

          {/* Dropdown Barang */}
          <li>
            <details className="group">
              <summary className="flex items-center font-extrabold ml-2 cursor-pointer hover:bg-white hover:text-black p-3 rounded-tl-xl rounded-bl-xl">
                <span className="text-lg">📦</span>
                {!isCollapsed && <span className="ml-6">Barang</span>}
              </summary>
              <ul className="ml-6 mt-2 space-y-2">
                <li>
                  <Link
                    to="/barang/jenis-barang"
                    className="flex items-center font-bold hover:bg-white hover:text-black p-2 rounded-md"
                  >
                    {!isCollapsed && <span className="ml-6">Jenis Barang</span>}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gudang/kategori-barang/dashboard"
                    className="flex items-center font-bold hover:bg-white hover:text-black p-2 rounded-md"
                  >
                    {!isCollapsed && (
                      <span className="ml-6">Kategori Barang</span>
                    )}
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          {/* Dropdown Transaksi Barang */}
          <li>
            <details className="group">
              <summary className="flex items-center font-extrabold ml-2 cursor-pointer hover:bg-white hover:text-black p-3 rounded-tl-xl rounded-bl-xl">
                <span className="text-lg">🔄</span>
                {!isCollapsed && <span className="ml-6">Transaksi Barang</span>}
              </summary>
              <ul className="ml-6 mt-2 space-y-2">
                <li>
                  <Link
                    to="/transaksi-barang/transaksi"
                    className="flex items-center font-bold hover:bg-white hover:text-black p-2 rounded-md"
                  >
                    {!isCollapsed && (
                      <span className="ml-6">Transaksi Barang</span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/transaksi-barang/detail-transaksi"
                    className="flex items-center font-bold hover:bg-white hover:text-black p-2 rounded-md"
                  >
                    {!isCollapsed && (
                      <span className="ml-6">Detail Transaksi</span>
                    )}
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          {/* Laporan Stok Menu */}
          <li>
            <Link
              to="/laporan-stok"
              className={`flex items-center font-extrabold ml-2 p-3 rounded-tl-xl rounded-bl-xl ${
                clicked === 3
                  ? "bg-white text-black"
                  : "hover:bg-white hover:text-black"
              }`}
              onClick={() => handleClick(3)} // Menandakan item yang diklik
            >
              <span className="text-lg">📊</span>
              {!isCollapsed && <span className="ml-6">Laporan Stok</span>}
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
