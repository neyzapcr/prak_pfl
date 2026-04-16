import { useState } from "react";
import { FaHome, FaListAlt, FaUserFriends, FaPlus } from "react-icons/fa";

export default function Sidebar() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const menus = [
    { id: "menu-1", label: "Dashboard", icon: <FaHome className="mr-4 text-xl" /> },
    { id: "menu-2", label: "Orders", icon: <FaListAlt className="mr-4 text-xl" /> },
    { id: "menu-3", label: "Customers", icon: <FaUserFriends className="mr-4 text-xl" /> },
  ];

  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg"
    >
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

        <span id="logo-subtitle" className="font-semibold text-gray-400">
          Modern Admin Dashboard
        </span>
      </div>

      <div id="sidebar-menu" className="mt-10">
        <ul id="menu-list" className="space-y-3">
          {menus.map((menu) => (
            <li
              key={menu.id}
              id={menu.id}
              onClick={() => setActiveMenu(menu.label)}
              className={`flex cursor-pointer items-center rounded-xl p-4 font-medium transition ${
                activeMenu === menu.label
                  ? "bg-green-100 text-hijau font-extrabold"
                  : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
              }`}
            >
              {menu.icon}
              <span>{menu.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div id="sidebar-footer" className="mt-auto">
        <div
          id="footer-card"
          className="mb-10 flex items-center rounded-md bg-hijau px-4 py-2 shadow-lg"
        >
          <div id="footer-text" className="text-sm text-white">
            <span>Please organize your menus through button below!</span>

            <div
              id="add-menu-button"
              className="mt-3 flex items-center justify-center space-x-2 rounded-md bg-white p-2 text-gray-600 hover:bg-gray-100 transition"
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