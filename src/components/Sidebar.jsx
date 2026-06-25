import {
  FaHome, FaListAlt, FaUserFriends, FaPlus,
  FaExclamationTriangle, FaBoxOpen, FaSignOutAlt
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { profile, signOut } = useAuth();
  const role = profile?.role || "member";

  const adminMenus = [
    { id: "menu-1", label: "Dashboard", to: "/", icon: <FaHome className="mr-4 text-xl" /> },
    { id: "menu-2", label: "Orders", to: "/orders", icon: <FaListAlt className="mr-4 text-xl" /> },
    { id: "menu-3", label: "Customers", to: "/customers", icon: <FaUserFriends className="mr-4 text-xl" /> },
    { id: "menu-4", label: "Components", to: "/components", icon: <FaUserFriends className="mr-4 text-xl" /> },
    { id: "menu-5", label: "Products", to: "/products", icon: <FaBoxOpen className="mr-4 text-xl" /> },
    { id: "menu-6", label: "Error 400", to: "/error-400", icon: <FaExclamationTriangle className="mr-4 text-xl" /> },
    { id: "menu-7", label: "Error 401", to: "/error-401", icon: <FaExclamationTriangle className="mr-4 text-xl" /> },
    { id: "menu-8", label: "Error 403", to: "/error-403", icon: <FaExclamationTriangle className="mr-4 text-xl" /> },
    { id: "menu-9", label: "Fitur XYZ", to: "/fiturxyz", icon: <FaBoxOpen className="mr-4 text-xl" /> },
  ];

  const memberMenus = [
    { id: "menu-1", label: "Dashboard Member", to: "/member/dashboard", icon: <FaHome className="mr-4 text-xl" /> },
  ];

  const menus = role === "admin" ? adminMenus : memberMenus;

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
          {role === "admin" ? "Modern Admin Dashboard" : "Member Panel"}
        </span>
      </div>
      <div className="mt-10">
        <ul className="space-y-3">
          {menus.map((menu) => (
            <li key={menu.id}>
              <NavLink to={menu.to} className={menuClass} end={menu.to === "/"}>
                {menu.icon}
                <span>{menu.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto">
        {role === "admin" ? (
          <div className="mb-10 flex items-center rounded-md bg-hijau px-4 py-2 shadow-lg">
            <div className="text-sm text-white">
              <span>Please organize your menus through button below!</span>
              <div className="mt-3 flex items-center justify-center space-x-2 rounded-md bg-white p-2 text-gray-600 hover:bg-gray-100 transition">
                <FaPlus className="text-lg" />
                <span>Add Menus</span>
              </div>
            </div>
            <img src="/img/avatar1.png" alt="avatar" className="w-20 rounded-full" />
          </div>
        ) : (
          <button
            onClick={signOut}
            className="w-full flex items-center rounded-md bg-red-100 text-red-600 hover:bg-red-200 p-4 font-bold transition cursor-pointer mb-5 text-sm"
          >
            <FaSignOutAlt className="mr-4 text-xl" />
            <span>Keluar (Logout)</span>
          </button>
        )}
        <span className="font-bold text-gray-400">Sedap Restaurant Admin Dashboard</span>
        <p className="font-light text-gray-400">&copy; 2025 All Right Reserved</p>
      </div>
    </div>
  );
}