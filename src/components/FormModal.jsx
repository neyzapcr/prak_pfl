export default function FormModal({ isOpen, title, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-50 px-3 py-1 text-sm font-semibold text-red-500 hover:bg-red-100"
          >
            Tutup
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}