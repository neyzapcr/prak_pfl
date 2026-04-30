import {
  FaHome,
  FaListAlt,
  FaUserFriends,
  FaPlus,
  FaExclamationTriangle,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menus = [
    {
      id: "menu-1",
      label: "Dashboard",
      to: "/",
      icon: <FaHome className="mr-4 text-xl" />,
    },
    {
      id: "menu-2",
      label: "Orders",
      to: "/orders",
      icon: <FaListAlt className="mr-4 text-xl" />,
    },
    {
      id: "menu-3",
      label: "Customers",
      to: "/customers",
      icon: <FaUserFriends className="mr-4 text-xl" />,
    },
    {
      id: "menu-4",
      label: "Error 400",
      to: "/error-400",
      icon: <FaExclamationTriangle className="mr-4 text-xl" />,
    },
    {
      id: "menu-5",
      label: "Error 401",
      to: "/error-401",
      icon: <FaExclamationTriangle className="mr-4 text-xl" />,
    },
    {
      id: "menu-6",
      label: "Error 403",
      to: "/error-403",
      icon: <FaExclamationTriangle className="mr-4 text-xl" />,
    },
  ];

  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2 ${
      isActive
        ? "text-hijau bg-green-200 font-extrabold"
        : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
    }`;

  return (
    <div className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg">
      <div className="flex flex-col">
        <span className="font-poppins text-[48px] text-gray-900">
          Sedap<b className="text-hijau">.</b>
        </span>

        <span className="font-semibold text-gray-400">
          Modern Admin Dashboard
        </span>
      </div>

      <div className="mt-10">
        <ul className="space-y-3">
          {menus.map((menu) => (
            <li key={menu.id}>
              <NavLink to={menu.to} className={menuClass}>
                {menu.icon}
                <span>{menu.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <div className="mb-10 flex items-center rounded-md bg-hijau px-4 py-2 shadow-lg">
          <div className="text-sm text-white">
            <span>Please organize your menus through button below!</span>

            <div className="mt-3 flex items-center justify-center space-x-2 rounded-md bg-white p-2 text-gray-600 hover:bg-gray-100 transition">
              <FaPlus className="text-lg" />
              <span>Add Menus</span>
            </div>
          </div>

          <img
            src="/img/avatar1.png"
            alt="avatar"
            className="w-20 rounded-full"
          />
        </div>

        <span className="font-bold text-gray-400">
          Sedap Restaurant Admin Dashboard
        </span>

        <p className="font-light text-gray-400">
          &copy; 2025 All Right Reserved
        </p>
      </div>
    </div>
  );
}