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
      <div className="min-h-full flex flex-col">
        <div className="p-3 text-center">
          <h1 className="text-2xl font-extrabold">
            {isCollapsed ? "WP" : "WarungPro"}
          </h1>
        </div>
        <ul className="mt-4 space-y-4 flex-1">
          {/* Home Menu */}
          <li>
            <Link
              to="/kasir/dashboard"
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

          {/* Dropdown Transaksi Barang */}
          <li>
            <details className="group">
              <summary className="flex items-center font-extrabold ml-2 cursor-pointer hover:bg-white hover:text-black p-3 rounded-tl-xl rounded-bl-xl">
                <span className="text-lg">🔄</span>
                {!isCollapsed && (
                  <span className="ml-6">Transaksi Penjualan</span>
                )}
              </summary>
              <ul className="ml-6 mt-2 space-y-2">
                <li>
                  <Link
                    to="/kasir/transaksi-penjualan/dashboard"
                    className="flex items-center font-bold hover:bg-white hover:text-black p-2 rounded-md"
                  >
                    {!isCollapsed && (
                      <span className="ml-6">Transaksi Penjualan</span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gudang/detail-transaksi-barang/dashboard"
                    className="flex items-center font-bold hover:bg-white hover:text-black p-2 rounded-md"
                  >
                    {!isCollapsed && (
                      <span className="ml-6">Detail Transaksi Penjualan</span>
                    )}
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          {/* Laporan Stok Menu */}
          <li>
            <Link
              to="/laporan_stok/dashboard"
              className={`flex items-center font-extrabold ml-2 p-3 rounded-tl-xl rounded-bl-xl ${
                clicked === 3
                  ? "bg-white text-black"
                  : "hover:bg-white hover:text-black"
              }`}
              onClick={() => handleClick(3)} // Menandakan item yang diklik
            >
              <span className="text-lg">📊</span>
              {!isCollapsed && <span className="ml-6">Laporan Penjualan</span>}
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;