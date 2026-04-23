import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage({ code, title, description, image }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-10 bg-gray-50">
      {/* Gambar Ilustrasi */}
      <img 
        src="img/no-content.png" 
        alt="Error illustration" 
        className="w-80 mb-6 drop-shadow-xl"
      />

      {/* Kode Error (Besar & Transparan) */}
      <h1 className="text-9xl font-black text-gray-200 leading-none">
        {code}
      </h1>

      {/* Judul & Deskripsi */}
      <div className="mt-4">
        <h2 className="text-4xl font-extrabold text-gray-800">
          {title || "Halaman Tidak Ditemukan"}
        </h2>
        <p className="text-gray-500 mt-4 max-w-md mx-auto text-lg leading-relaxed">
          {description || "Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan. Silakan kembali ke dashboard utama."}
        </p>
      </div>

      {/* Tombol Kembali */}
      <Link 
        to="/" 
        className="mt-10 bg-hijau text-white px-10 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 hover:bg-green-600 transition duration-300"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
}