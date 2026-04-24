import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import FormModal from "../components/FormModal";
import customersData from "../data/customers.json";

const emptyCustomer = {
  customerId: "",
  customerName: "",
  email: "",
  phone: "",
  loyalty: "Bronze",
};

export default function Customers() {
  const [customers, setCustomers] = useState(customersData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [formData, setFormData] = useState(emptyCustomer);

  const openAddModal = () => {
    setSelectedIndex(null);
    setFormData(emptyCustomer);
    setIsModalOpen(true);
  };

  const openEditModal = (customer, index) => {
    setSelectedIndex(index);
    setFormData(customer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIndex(null);
    setFormData(emptyCustomer);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedIndex !== null) {
      const updatedCustomers = [...customers];
      updatedCustomers[selectedIndex] = formData;
      setCustomers(updatedCustomers);
    } else {
      setCustomers([formData, ...customers]);
    }
    closeModal();
  };

  const getLoyaltyClass = (loyalty) => {
    if (loyalty === "Gold") return "bg-yellow-100 text-yellow-600";
    if (loyalty === "Silver") return "bg-blue-100 text-blue-600";
    return "bg-gray-100 text-gray-500";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Customers" breadcrumb={["Customers"]}>
        <button
          onClick={openAddModal}
          className="bg-hijau text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:opacity-90 transition">
          + Add Customer
        </button>
      </PageHeader>

      <div className="px-8 pb-10">
        <div className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100 bg-gray-50 text-sm uppercase text-gray-400">
              <tr>
                <th className="px-8 py-5">Customer ID</th>
                <th className="px-8 py-5">Customer Name</th>
                <th className="px-8 py-5">Email</th>
                <th className="px-8 py-5">Phone</th>
                <th className="px-8 py-5">Loyalty</th>
                <th className="px-8 py-5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customers.map((customer, index) => (
                <tr
                  key={customer.customerId}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-8 py-5 text-gray-400">
                    {customer.customerId}
                  </td>
                  <td className="px-8 py-5 font-bold text-gray-800">
                    {customer.customerName}
                  </td>
                  <td className="px-8 py-5 text-gray-600">{customer.email}</td>
                  <td className="px-8 py-5 text-gray-600">{customer.phone}</td>
                  <td className="px-8 py-5">
                    <span
                      className={`rounded-lg px-4 py-1 text-xs font-bold ${getLoyaltyClass(
                        customer.loyalty,
                      )}`}>
                      {customer.loyalty}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <button
                      onClick={() => openEditModal(customer, index)}
                      className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600">
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
        title={selectedIndex !== null ? "Edit Customer" : "Add Customer"}>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            placeholder="Customer ID"
            className="rounded-xl border border-gray-200 p-3 outline-none"
            required/>

          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Customer Name"
            className="rounded-xl border border-gray-200 p-3 outline-none"
            required/>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="rounded-xl border border-gray-200 p-3 outline-none"
            required/>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="rounded-xl border border-gray-200 p-3 outline-none"
            required/>

          <select
            name="loyalty"
            value={formData.loyalty}
            onChange={handleChange}
            className="rounded-xl border border-gray-200 p-3 outline-none md:col-span-2">
            <option value="Bronze">Bronze</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
          </select>

          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              className="rounded-xl bg-hijau px-5 py-3 font-bold text-white"> 
              {selectedIndex !== null ? "Update Customer" : "Simpan Customer"}
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="rounded-xl bg-gray-200 px-5 py-3 font-bold text-gray-700">
              Batal
            </button>
          </div>
        </form>
      </FormModal>
    </div>
  );
}
