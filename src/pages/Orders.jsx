import React from "react";
import PageHeader from "../components/PageHeader";
import { FaEye, FaDownload } from "react-icons/fa";

export default function Orders() {
  // Data dummy pesanan
  const orders = [
    {
      id: "#ORD-7712",
      customer: "Joy",
      date: "23 Apr 2026",
      amount: "Rp 150.000",
      status: "Completed",
    },
    {
      id: "#ORD-7713",
      customer: "JOy",
      date: "23 Apr 2026",
      amount: "Rp 85.000",
      status: "Pending",
    },
    {
      id: "#ORD-7714",
      customer: "JOY",
      date: "22 Apr 2026",
      amount: "Rp 210.000",
      status: "On Delivery",
    },
    {
      id: "#ORD-7715",
      customer: "JOYY",
      date: "21 Apr 2026",
      amount: "Rp 45.000",
      status: "Cancelled",
    },
  ];

  // Helper untuk warna status
  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-600";
      case "Pending": return "bg-yellow-100 text-yellow-600";
      case "On Delivery": return "bg-blue-100 text-blue-600";
      case "Cancelled": return "bg-red-100 text-red-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div id="orders-container" className="bg-gray-50 min-h-screen">
      <PageHeader />

      <div className="p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Orders</h1>
          <button className="bg-hijau text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:opacity-90 transition">
            Export Report
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-sm font-bold text-gray-600">Order ID</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-600">Customer</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-600">Date</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-600">Amount</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-600">Status</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-600 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-8 py-5 font-bold text-hijau">{order.id}</td>
                  <td className="px-8 py-5 font-medium text-gray-800">{order.customer}</td>
                  <td className="px-8 py-5 text-gray-500">{order.date}</td>
                  <td className="px-8 py-5 font-bold text-gray-800">{order.amount}</td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center space-x-3 text-gray-400">
                      <button className="hover:text-hijau transition"><FaEye /></button>
                      <button className="hover:text-blue-500 transition"><FaDownload /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}