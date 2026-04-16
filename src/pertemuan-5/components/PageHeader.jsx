import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

export default function PageHeader() {
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(false);

    setTimeout(() => {
      setShowToast(true);
    }, 50);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <>
      <div
        id="pageheader-container"
        className="flex items-center justify-between p-4"
      >
        <div id="pageheader-left" className="flex flex-col">
          <span id="page-title" className="text-3xl font-semibold">
            Dashboard
          </span>

          <div
            id="breadcrumb-links"
            className="flex items-center font-medium space-x-2 mt-2"
          >
            <span id="breadcrumb-home" className="text-gray-500">
              Dashboard
            </span>
            <span id="breadcrumb-separator" className="text-gray-500">
              /
            </span>
            <span id="breadcrumb-current" className="text-gray-500">
              Order List
            </span>
          </div>
        </div>

        <div id="action-button">
          <button
            id="add-button"
            onClick={handleShowToast}
            className="bg-hijau text-white px-4 py-2 rounded-lg hover:opacity-90 transition cursor-pointer shadow-md"
          >
            Tampilkan Notifikasi Pop Up
          </button>
        </div>
      </div>

      <div
        id="toast-wrapper"
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          showToast
            ? "translate-y-0 opacity-100"
            : "translate-y-12 opacity-0 pointer-events-none"
        }`}
      >
        <div
          id="toast-notification"
          className="w-[360px] rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden"
        >
          <div className="flex items-start gap-3 p-4">
            <div className="mt-1 text-hijau text-2xl">
              <FaCheckCircle />
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-bold text-gray-800">
                Pesanan Baru Masuk
              </h3>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                Ada pesanan baru dari <b>Meja 07</b>. Silakan buka halaman order
                untuk segera memproses pesanan pelanggan.
              </p>

              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-semibold text-hijau bg-green-50 px-2 py-1 rounded-md">
                  Baru saja
                </span>
                <span className="text-xs text-gray-400">
                  Restaurant Notification
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowToast(false)}
              className="text-gray-400 hover:text-red-500 transition mt-1"
            >
              <FaTimes />
            </button>
          </div>

          <div className="h-1 w-full bg-gray-100">
            <div
              className={`h-1 bg-hijau ${
                showToast ? "animate-[toastbar_4s_linear]" : ""
              }`}
            ></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes toastbar {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </>
  );
}