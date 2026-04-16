import { FaHome, FaListAlt, FaUserFriends, FaPlus } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg"
    >
      {/* Logo */}
      <div id="sidebar-logo" className="flex flex-col">
        <span
          id="logo-title"
          className="font-poppins text-[48px] text-gray-900"
        >
          Sedap
          <b id="logo-dot" className="text-hijau">
            .
          </b>
        </span>
        <span
          id="logo-subtitle"
          className="font-semibold text-gray-400"
        >
          Modern Admin Dashboard
        </span>
      </div>

      {/* Menu */}
      <div id="sidebar-menu" className="mt-10">
        <ul id="menu-list" className="space-y-3">
          
          <li
            id="menu-1"
            className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"
          >
            <FaHome className="mr-4 text-xl" />
            <span>Dashboard</span>
          </li>

          <li
            id="menu-2"
            className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"
          >
            <FaListAlt className="mr-4 text-xl" />
            <span>Orders</span>
          </li>

          <li
            id="menu-3"
            className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"
          >
            <FaUserFriends className="mr-4 text-xl" />
            <span>Customers</span>
          </li>

        </ul>
      </div>

      {/* Footer */}
      <div id="sidebar-footer" className="mt-auto">
        <div
          id="footer-card"
          className="mb-10 flex items-center rounded-md bg-hijau px-4 py-2 shadow-lg"
        >
          <div id="footer-text" className="text-sm text-white">
            <span>Please organize your menus through button below!</span>

            <div
              id="add-menu-button"
              className="mt-3 flex items-center justify-center space-x-2 rounded-md bg-white p-2 text-gray-600"
            >
              <FaPlus className="text-lg" />
              <span>Add Menus</span>
            </div>
          </div>

          <img
            id="footer-avatar"
            src="/img/avatar1.png"
            alt="avatar"
            className="w-20 rounded-full"
          />
        </div>

        <span id="footer-brand" className="font-bold text-gray-400">
          Sedap Restaurant Admin Dashboard
        </span>

        <p id="footer-copyright" className="font-light text-gray-400">
          &copy; 2025 All Right Reserved
        </p>
      </div>
    </div>
  );
}