import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import productsData from "../data/products.json";

export default function Produk() {
  const [search, setSearch] = useState("");

  const filtered = productsData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Products" breadcrumb={["Products"]} />
      <div className="px-8 pb-10">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 bg-white rounded-xl px-4 py-2 outline-none w-full max-w-sm focus:ring-2 focus:ring-green-100 focus:border-hijau transition"
          />
        </div>
        <div className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100 bg-gray-50 text-sm uppercase text-gray-400">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Code</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {filtered.map((item, index) => (
                <tr key={item.id} className="transition hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-400">{index + 1}.</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/products/${item.id}`}
                      className="text-emerald-500 hover:text-emerald-600 font-semibold hover:underline"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{item.code}</td>
                  <td className="px-6 py-4 text-gray-600">{item.category}</td>
                  <td className="px-6 py-4 text-gray-600">{item.brand}</td>
                  <td className="px-6 py-4 font-bold text-gray-800">
                    Rp {item.price.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-lg px-3 py-1 text-xs font-bold ${
                      item.stock <= 5 ? "bg-red-100 text-red-600"
                      : item.stock <= 15 ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                    }`}>
                      {item.stock}
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