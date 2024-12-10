import React, { useState } from "react";
import Sidebar from "./layouts/Sidebar";
import Navbar from "./layouts/Navbar";

const GudangDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
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
              Dashboard Content
            </h1>
            <p className="text-gray-600">
              This is where your main content goes.
            </p>
          </div>

          {/* Wrapper untuk tabel dengan overflow-x-auto */}
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-300">#</th>
                  <th className="px-4 py-2 border border-gray-300">Name</th>
                  <th className="px-4 py-2 border border-gray-300">Age</th>
                  <th className="px-4 py-2 border border-gray-300">Email</th>
                  <th className="px-4 py-2 border border-gray-300">Phone</th>
                  <th className="px-4 py-2 border border-gray-300">City</th>
                  <th className="px-4 py-2 border border-gray-300">Country</th>
                  <th className="px-4 py-2 border border-gray-300">Status</th>

                  <th className="px-4 py-2 border border-gray-300">Phone</th>
                  <th className="px-4 py-2 border border-gray-300">City</th>
                  <th className="px-4 py-2 border border-gray-300">Country</th>
                  <th className="px-4 py-2 border border-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border border-gray-300">1</td>
                  <td className="px-4 py-2 border border-gray-300">John Doe</td>
                  <td className="px-4 py-2 border border-gray-300">28</td>
                  <td className="px-4 py-2 border border-gray-300">
                    john.doe@example.com
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    +1234567890
                  </td>
                  <td className="px-4 py-2 border border-gray-300">New York</td>
                  <td className="px-4 py-2 border border-gray-300">USA</td>
                  <td className="px-4 py-2 border border-gray-300">Active</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-300">2</td>
                  <td className="px-4 py-2 border border-gray-300">
                    Jane Smith
                  </td>
                  <td className="px-4 py-2 border border-gray-300">34</td>
                  <td className="px-4 py-2 border border-gray-300">
                    jane.smith@example.com
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    +9876543210
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    Los Angeles
                  </td>
                  <td className="px-4 py-2 border border-gray-300">USA</td>
                  <td className="px-4 py-2 border border-gray-300">Inactive</td>
                </tr>
                {/* Baris lainnya dapat ditambahkan di sini */}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GudangDashboard;
