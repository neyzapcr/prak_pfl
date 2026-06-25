import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { FaArrowLeft, FaBox, FaCoins } from "react-icons/fa";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      try {
        const { data, error: fetchError } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (fetchError) throw fetchError;
        setProduct(data);
      } catch (err) {
        setError(err.message || "Gagal memuat detail produk.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Memuat detail produk...</div>;
  }

  if (error) {
    return (
      <div className="p-6 max-w-lg mx-auto mt-10 bg-red-50 border border-red-200 text-red-600 rounded-2xl">
        <p className="font-semibold">Error:</p>
        <p className="text-sm">{error}</p>
        <Link
          to="/products"
          className="mt-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-semibold"
        >
          <FaArrowLeft /> Kembali ke Daftar Produk
        </Link>
      </div>
    );
  }

  if (!product) {
    return <div className="p-10 text-center text-gray-500">Produk tidak ditemukan.</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto mt-6 bg-white rounded-3xl shadow-lg border border-gray-100">
      <div className="mb-6">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-hijau font-semibold transition"
        >
          <FaArrowLeft /> Kembali ke Produk
        </Link>
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        {/* Placeholder Box Visual */}
        <div className="md:col-span-2 bg-gray-50 border border-gray-100 rounded-2xl flex flex-col items-center justify-center py-10 text-gray-300">
          <FaBox className="text-6xl text-hijau/20 mb-2" />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sedap Catalog</span>
        </div>

        {/* Info Detail */}
        <div className="md:col-span-3 flex flex-col justify-between">
          <div>
            <span className="text-xs font-black uppercase text-hijau bg-green-50 px-3 py-1 rounded-md">
              Katalog Produk
            </span>
            <h2 className="text-2xl font-black text-gray-800 mt-2 mb-3">{product.name}</h2>
            
            <p className="text-sm text-gray-400 font-semibold uppercase tracking-wide">Deskripsi</p>
            <p className="text-sm text-gray-600 mt-1 mb-5 leading-relaxed">
              {product.description || "Tidak ada deskripsi untuk produk ini."}
            </p>
          </div>

          <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-semibold">HARGA PRODUK</p>
              <p className="text-xl font-black text-hijau mt-0.5">
                Rp {Number(product.price).toLocaleString("id-ID")}
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-xs text-gray-400 font-semibold">STOK TERSEDIA</p>
              <span className={`inline-block mt-1 rounded-lg px-3 py-1 text-xs font-bold ${
                product.stock <= 5 ? "bg-red-100 text-red-600" :
                product.stock <= 15 ? "bg-yellow-100 text-yellow-600" :
                "bg-green-100 text-green-600"
              }`}>
                {product.stock} pcs
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}