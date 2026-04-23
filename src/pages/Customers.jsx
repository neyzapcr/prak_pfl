import React from "react";
import PageHeader from "../components/PageHeader";

export default function Customers() {
  const customers = Array.from({ length: 30 }, (_, i) => ({
    id: `CUST-${500 + i}`,
    name: ["John Doe", "Jane Smith", "Ali Baba", "Sarah Joy", "Michael Scott"][i % 5],
    email: `user${i}@sedap.com`,
    phone: `0812-3456-78${i.toString().padStart(2, '0')}`,
    loyalty: ["Bronze", "Silver", "Gold"][i % 3],
  }));

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageHeader title="Customers" breadcrumb="Customer List">
        <button 
          onClick={() => alert("Form Add Customer Muncul!")}
          className="bg-hijau text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-green-600 transition"
        >
          + Add Customer
        </button>
      </PageHeader>

      <div className="px-8 pb-10">
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 text-sm uppercase">
              <tr>
                <th className="px-8 py-5">Customer ID</th>
                <th className="px-8 py-5">Name</th>
                <th className="px-8 py-5">Email</th>
                <th className="px-8 py-5">Phone</th>
                <th className="px-8 py-5">Loyalty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  <td className="px-8 py-5 text-gray-400">{c.id}</td>
                  <td className="px-8 py-5 font-bold text-gray-800">{c.name}</td>
                  <td className="px-8 py-5 text-gray-600">{c.email}</td>
                  <td className="px-8 py-5 text-gray-600">{c.phone}</td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1 rounded-lg text-xs font-bold ${
                      c.loyalty === "Gold" ? "bg-orange-100 text-orange-600" :
                      c.loyalty === "Silver" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                    }`}>
                      {c.loyalty}
                    </span>
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