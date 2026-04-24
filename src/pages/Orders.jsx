import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import FormModal from "../components/FormModal";
import ordersData from "../data/orders.json";

const emptyOrder = {
  orderId: "",
  customerName: "",
  status: "Pending",
  totalPrice: "",
  orderDate: "",
};

export default function Orders() {
  const [orders, setOrders] = useState(ordersData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [formData, setFormData] = useState(emptyOrder);

  const openAddModal = () => {
    setSelectedIndex(null);
    setFormData(emptyOrder);
    setIsModalOpen(true);
  };

  const openEditModal = (order, index) => {
    setSelectedIndex(index);
    setFormData(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIndex(null);
    setFormData(emptyOrder);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "totalPrice" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedIndex !== null) {
      const updatedOrders = [...orders];
      updatedOrders[selectedIndex] = formData;
      setOrders(updatedOrders);
    } else {
      setOrders([formData, ...orders]);
    }

    closeModal();
  };

  const getStatusClass = (status) => {
    if (status === "Completed") return "bg-green-100 text-green-600";
    if (status === "Pending") return "bg-yellow-100 text-yellow-600";
    return "bg-red-100 text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Orders" breadcrumb={["Orders"]}>
        <button
  onClick={openAddModal}
  className="bg-hijau text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:opacity-90 transition"
>
  + Add Orders
</button>
      </PageHeader>

      <div className="p-6">
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs font-bold uppercase text-gray-400">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total Price</th>
                <th className="px-6 py-4">Order Date</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {orders.map((order, index) => (
                <tr key={order.orderId} className="transition hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-hijau">{order.orderId}</td>
                  <td className="px-6 py-4 font-semibold text-gray-700">{order.customerName}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-black uppercase ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold">
                    Rp {Number(order.totalPrice).toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-gray-400">{order.orderDate}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openEditModal(order, index)}
                      className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedIndex !== null ? "Edit Order" : "Add Orders"}
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            name="orderId"
            value={formData.orderId}
            onChange={handleChange}
            placeholder="Order ID"
            className="rounded-xl border border-gray-200 p-3 outline-none"
            required
          />

          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Customer Name"
            className="rounded-xl border border-gray-200 p-3 outline-none"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="rounded-xl border border-gray-200 p-3 outline-none"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <input
            type="number"
            name="totalPrice"
            value={formData.totalPrice}
            onChange={handleChange}
            placeholder="Total Price"
            className="rounded-xl border border-gray-200 p-3 outline-none"
            required
          />

          <input
            type="date"
            name="orderDate"
            value={formData.orderDate}
            onChange={handleChange}
            className="rounded-xl border border-gray-200 p-3 outline-none md:col-span-2"
            required
          />

          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              className="rounded-xl bg-hijau px-5 py-3 font-bold text-white"
            >
              {selectedIndex !== null ? "Update Order" : "Simpan Order"}
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="rounded-xl bg-gray-200 px-5 py-3 font-bold text-gray-700"
            >
              Batal
            </button>
          </div>
        </form>
      </FormModal>
    </div>
  );
}