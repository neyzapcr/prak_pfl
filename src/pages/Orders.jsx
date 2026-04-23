import React from "react";
import PageHeader from "../components/PageHeader";

export default function Orders() {
  const dataOrders = Array.from({ length: 30 }, (_, i) => ({
    id: `#ORD-${1000 + i}`,
    customerName: ["Ahmad Dhani", "Budi Doremi", "Citra Scholastika", "Dedi Corbuzier", "Eka Gustiwana"][i % 5],
    status: ["Pending", "Completed", "Cancelled"][i % 3],
    totalPrice: `Rp ${(Math.floor(Math.random() * 50) + 10) * 1000}`,
    date: `${(i % 28) + 1} April 2026`
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Orders List" breadcrumb={[ "Orders"]}>
        <button 
          onClick={() => alert(JSON.stringify(dataOrders[0], null, 2))}
          className="bg-hijau text-white px-5 py-2 rounded-xl font-bold shadow-md hover:opacity-90"
        >
          + Add Orders
        </button>
      </PageHeader>
      
      <div className="p-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total Price</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {dataOrders.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-bold text-hijau">{item.id}</td>
                  <td className="px-6 py-4 font-semibold text-gray-700">{item.customerName}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      item.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                      item.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                    }`}>{item.status}</span>
                  </td>
                  <td className="px-6 py-4 font-bold">{item.totalPrice}</td>
                  <td className="px-6 py-4 text-gray-400">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}