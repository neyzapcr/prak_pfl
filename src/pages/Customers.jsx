import React from "react";
import { FaUserFriends, FaUserCheck, FaUserClock, FaUserMinus } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Customer() {
  // Data dummy untuk contoh tabel
  const customers = [
    { id: 1, name: "Budi Santoso", email: "budi@gmail.com", status: "Active", joinDate: "20 Jan 2024" },
    { id: 2, name: "Siti Aminah", email: "siti@yahoo.com", status: "Inactive", joinDate: "15 Feb 2024" },
    { id: 3, name: "Andi Wijaya", email: "andi@outlook.com", status: "Active", joinDate: "02 Mar 2024" },
  ];

  // Data untuk kotak statistik (Card)
  const stats = [
    { label: "Total Customers", value: "1,250", icon: <FaUserFriends />, color: "bg-blue-500" },
    { label: "Active", value: "1,180", icon: <FaUserCheck />, color: "bg-green-500" },
    { label: "Pending", value: "45", icon: <FaUserClock />, color: "bg-yellow-500" },
    { label: "Blocked", value: "25", icon: <FaUserMinus />, color: "bg-red-500" },
  ];

  return (
    <div id="customer-container" className="bg-gray-50 min-h-screen pb-10">
      <PageHeader title="Customer List" />

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 mt-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm flex items-center space-x-4 border border-gray-100">
            <div className={`${stat.color} p-4 rounded-xl text-white text-2xl`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="px-6 mt-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Customer Details</h2>
            <button className="bg-hijau text-white px-4 py-2 rounded-lg hover:opacity-90 transition font-semibold">
              + Add New Customer
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Join Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">{c.name}</td>
                    <td className="px-6 py-4 text-gray-600">{c.email}</td>
                    <td className="px-6 py-4 text-gray-600">{c.joinDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        c.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-blue-500 hover:underline cursor-pointer font-medium">
                      Edit
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}