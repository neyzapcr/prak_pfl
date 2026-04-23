import {
  FaShoppingCart,
  FaTruck,
  FaBan,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
  return (
    <div id="dashboard-container">
      <PageHeader />

      <div
        id="dashboard-grid"
        className="p-5 grid sm:grid-cols-2 md:grid-cols-5 gap-4"
      >
        <div
          id="dashboard-orders"
          className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 hover:-translate-y-1 transition"
        >
          <div id="orders-icon" className="bg-hijau rounded-full p-4">
            <FaShoppingCart className="text-3xl text-white" />
          </div>
          <div id="orders-info" className="flex flex-col">
            <span id="orders-count" className="text-2xl font-bold">
              75
            </span>
            <span id="orders-text" className="text-gray-400">
              Total Orders
            </span>
          </div>
        </div>

        <div
          id="dashboard-delivered"
          className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 hover:-translate-y-1 transition"
        >
          <div id="delivered-icon" className="bg-biru rounded-full p-4">
            <FaTruck className="text-3xl text-white" />
          </div>
          <div id="delivered-info" className="flex flex-col">
            <span id="delivered-count" className="text-2xl font-bold">
              175
            </span>
            <span id="delivered-text" className="text-gray-400">
              Total Delivered
            </span>
          </div>
        </div>

        <div
          id="dashboard-canceled"
          className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 hover:-translate-y-1 transition"
        >
          <div id="canceled-icon" className="bg-merah rounded-full p-4">
            <FaBan className="text-3xl text-white" />
          </div>
          <div id="canceled-info" className="flex flex-col">
            <span id="canceled-count" className="text-2xl font-bold">
              40
            </span>
            <span id="canceled-text" className="text-gray-400">
              Total Canceled
            </span>
          </div>
        </div>

        <div
          id="dashboard-revenue"
          className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 hover:-translate-y-1 transition"
        >
          <div id="revenue-icon" className="bg-kuning rounded-full p-4">
            <FaDollarSign className="text-3xl text-white" />
          </div>
          <div id="revenue-info" className="flex flex-col">
            <span id="revenue-amount" className="text-2xl font-bold">
              Rp.128
            </span>
            <span id="revenue-text" className="text-gray-400">
              Total Revenue
            </span>
          </div>
        </div>

        <div
          id="dashboard-customers"
          className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 hover:-translate-y-1 transition"
        >
          <div id="customers-icon" className="bg-ungu rounded-full p-4">
            <FaUsers className="text-3xl text-white" />
          </div>
          <div id="customers-info" className="flex flex-col">
            <span id="customers-count" className="text-2xl font-bold">
              89
            </span>
            <span id="customers-text" className="text-gray-400">
              Total Customers
            </span>
          </div>
        </div>
      </div>

      <div id="dashboard-bottom-section" className="px-5 pb-5">
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Activity Summary
            </h2>
            <span className="text-sm text-gray-400">Today</span>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-400">Pesanan Diproses</p>
              <h3 className="text-2xl font-bold text-hijau mt-2">32</h3>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-400">Pesanan Selesai</p>
              <h3 className="text-2xl font-bold text-biru mt-2">18</h3>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-400">Pesanan Dibatalkan</p>
              <h3 className="text-2xl font-bold text-merah mt-2">4</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}