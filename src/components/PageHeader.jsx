import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

export default function PageHeader({ title = "Dashboard", breadcrumb = "Home", children }) {
  const [showToast, setShowToast] = useState(false);
  const breadcrumbs = Array.isArray(breadcrumb) ? breadcrumb : [breadcrumb];

  const handleShowToast = () => {
    setShowToast(false);
    setTimeout(() => setShowToast(true), 50);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <>
      <div className="flex items-center justify-between p-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <div className="flex items-center space-x-2 mt-1 text-sm font-medium">
            <span className="text-gray-400">Home</span>
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <span className="text-gray-300">/</span>
                <span className={index === breadcrumbs.length - 1 ? "text-hijau" : "text-gray-400"}>
                  {item}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShowToast}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition shadow-sm text-sm font-semibold"
          >
            Tampilkan Notifikasi Pop Up
          </button>
          {/* Slot untuk tombol Add Orders / Add Customer */}
          {children}
        </div>
      </div>

      {/* Toast Notification */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${showToast ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"}`}>
        <div className="w-[350px] rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-start gap-3 p-4">
            <div className="text-hijau text-xl"><FaCheckCircle /></div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-gray-800">Action Success!</h3>
              <p className="text-xs text-gray-500 mt-1">Sistem berhasil memproses permintaan Anda.</p>
            </div>
            <button onClick={() => setShowToast(false)} className="text-gray-400 hover:text-red-500"><FaTimes /></button>
          </div>
          <div className="h-1 w-full bg-gray-100">
            <div className={`h-1 bg-hijau ${showToast ? "animate-[toastbar_4s_linear]" : ""}`}></div>
          </div>
        </div>
      </div>
      <style>{`@keyframes toastbar { from { width: 100%; } to { width: 0%; } }`}</style>
    </>
  );
}