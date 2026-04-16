import { useEffect, useRef, useState } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
  const [showNotif, setShowNotif] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocus, setIsSearchFocus] = useState(false);
  const notifRef = useRef(null);

  const notifications = [
    {
      title: "Pesanan Baru",
      desc: "Order baru dari Meja 07 baru saja masuk.",
      time: "1 menit lalu",
    },
    {
      title: "Customer Baru",
      desc: "1 customer baru berhasil terdaftar hari ini.",
      time: "5 menit lalu",
    },
    {
      title: "Pembayaran Berhasil",
      desc: "Pembayaran order #102 telah berhasil diproses.",
      time: "10 menit lalu",
    },
    {
      title: "Stok Menipis",
      desc: "Stok bahan ayam mulai menipis, segera restock.",
      time: "14 menit lalu",
    },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotif(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      id="header-container"
      className="flex justify-between items-center p-4 gap-4"
    >
      <div id="search-bar" className="relative w-full max-w-lg">
        <input
          id="search-input"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsSearchFocus(true)}
          onBlur={() => setIsSearchFocus(false)}
          placeholder="Search Here..."
          className={`border p-2 pr-10 bg-white w-full max-w-lg rounded-md outline-none transition ${
            isSearchFocus
              ? "border-hijau ring-2 ring-green-100"
              : "border-gray-100"
          }`}
        />
        <FaSearch
          id="search-icon"
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
            isSearchFocus ? "text-hijau" : "text-gray-300"
          }`}
        />

        {searchValue && (
          <div
            id="search-suggestion"
            className="absolute top-12 left-0 w-full bg-white rounded-xl shadow-lg border border-gray-100 p-3 z-20"
          >
            <p className="text-sm text-gray-400 mb-2">Hasil pencarian cepat</p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                Cari: <b>{searchValue}</b>
              </div>
              <div className="p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                Order List terkait "{searchValue}"
              </div>
              <div className="p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                Customer terkait "{searchValue}"
              </div>
            </div>
          </div>
        )}
      </div>

      <div id="icons-container" className="flex items-center space-x-4 relative">
        <div className="relative" ref={notifRef}>
          <button
            id="notification-icon"
            onClick={() => setShowNotif(!showNotif)}
            className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer hover:scale-105 transition"
          >
            <FaBell />
            <span
              id="notification-badge"
              className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-full min-w-6 h-6 px-1 flex items-center justify-center text-xs font-semibold"
            >
              4
            </span>
          </button>

          <div
            id="notification-popup"
            className={`absolute top-16 right-0 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-30 transition-all duration-300 origin-top ${
              showNotif
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                : "opacity-0 -translate-y-3 scale-95 pointer-events-none"
            }`}
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-700">Notifications</h3>
                <p className="text-xs text-gray-400">Ada 4 notifikasi baru</p>
              </div>

              <button
                onClick={() => setShowNotif(false)}
                className="text-xs px-3 py-1 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
              >
                Tutup
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-3 space-y-3">
              {notifications.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-100 p-3 hover:bg-blue-50 transition cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-700">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                    </div>

                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                  </div>

                  <p className="text-xs text-gray-400 mt-2">{item.time}</p>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
              <button className="w-full py-2 rounded-xl bg-blue-500 text-white hover:opacity-90 transition">
                Lihat Semua Notifikasi
              </button>
            </div>
          </div>
        </div>

        <div
          id="chart-icon"
          className="p-3 bg-blue-100 rounded-2xl cursor-pointer hover:scale-105 transition"
        >
          <FcAreaChart />
        </div>

        <div
          id="settings-icon"
          className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer hover:scale-105 transition"
        >
          <SlSettings />
        </div>

        <div
          id="profile-container"
          className="flex items-center space-x-4 border-l pl-4 border-gray-300"
        >
          <span id="profile-text">
            Hello, <b>Fikri Muhaffizh</b>
          </span>
          <img
            id="profile-avatar"
            src="/img/avatar1.png"
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}