import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/supabaseClient";
import PageHeader from "../components/PageHeader";
import { FaAward, FaCoins, FaShoppingBag, FaDollarSign, FaUser, FaHistory } from "react-icons/fa";

export default function MemberDashboard() {
  const { profile, signOut } = useAuth();
  const [orders, setOrders] = useState([]);
  const [pointsHistory, setPointsHistory] = useState([]);
  const [stats, setStats] = useState({ totalOrders: 0, totalSpent: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("orders"); // "orders" atau "points"

  useEffect(() => {
    if (!profile) return;

    const fetchMemberData = async () => {
      setLoading(true);
      setError("");
      try {
        // 1. Ambil data customer yang memiliki profile_id sama dengan user login (profile.id)
        const { data: customerData, error: customerError } = await supabase
          .from("customers")
          .select("id")
          .eq("profile_id", profile.id)
          .maybeSingle();

        if (customerError) throw customerError;

        // 2. Ambil data riwayat poin dari tabel point_transactions
        const { data: pointsData, error: pointsError } = await supabase
          .from("point_transactions")
          .select("*")
          .eq("member_id", profile.id)
          .order("created_at", { ascending: false });

        if (pointsError) throw pointsError;
        setPointsHistory(pointsData || []);

        if (customerData) {
          // 3. Ambil semua orders berdasarkan customer_id tersebut
          const { data: orderData, error: orderError } = await supabase
            .from("orders")
            .select("*")
            .eq("customer_id", customerData.id)
            .order("created_at", { ascending: false });

          if (orderError) throw orderError;
          setOrders(orderData || []);

          // 4. Hitung statistik belanja (Total pesanan dan total belanja pesanan yang 'completed')
          const total = orderData?.length || 0;
          const spent = orderData
            ?.filter((o) => o.status === "completed")
            .reduce((sum, o) => sum + Number(o.total_amount || 0), 0) || 0;

          setStats({ totalOrders: total, totalSpent: spent });
        } else {
          setOrders([]);
          setStats({ totalOrders: 0, totalSpent: 0 });
        }
      } catch (err) {
        console.error("Gagal memuat data member:", err.message);
        setError("Gagal memuat data transaksi belanja atau poin Anda.");
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [profile]);

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Memuat dashboard member...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <PageHeader title={`Halo, ${profile?.full_name || "Member"}`} breadcrumb="Dashboard Member" />

      {error && (
        <div className="bg-red-100 border border-red-200 text-red-600 text-sm rounded-2xl p-4 mb-6 max-w-5xl">
          {error}
        </div>
      )}

      {/* Grid Kartu Informasi */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 max-w-5xl">
        {/* Info Tier */}
        <div className="bg-white rounded-2xl p-6 shadow-md flex items-center gap-4 border border-gray-100">
          <div className="p-4 bg-yellow-100 rounded-xl text-yellow-600 text-2xl">
            <FaAward />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-semibold">Tier Anggota</p>
            <h3 className="text-xl font-black text-gray-800">{profile?.tier || "Bronze"}</h3>
          </div>
        </div>

        {/* Info Poin */}
        <div className="bg-white rounded-2xl p-6 shadow-md flex items-center gap-4 border border-gray-100">
          <div className="p-4 bg-green-100 rounded-xl text-green-600 text-2xl">
            <FaCoins />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-semibold">Total Poin</p>
            <h3 className="text-xl font-black text-gray-800">{profile?.points || 0} Poin</h3>
          </div>
        </div>

        {/* Total Pesanan */}
        <div className="bg-white rounded-2xl p-6 shadow-md flex items-center gap-4 border border-gray-100">
          <div className="p-4 bg-blue-100 rounded-xl text-blue-600 text-2xl">
            <FaShoppingBag />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-semibold">Total Pesanan</p>
            <h3 className="text-xl font-black text-gray-800">{stats.totalOrders}</h3>
          </div>
        </div>

        {/* Total Belanja */}
        <div className="bg-white rounded-2xl p-6 shadow-md flex items-center gap-4 border border-gray-100">
          <div className="p-4 bg-purple-100 rounded-xl text-purple-600 text-2xl">
            <FaDollarSign />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-semibold">Total Belanja</p>
            <h3 className="text-xl font-black text-gray-800">
              Rp {stats.totalSpent.toLocaleString("id-ID")}
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl">
        {/* Tabbed Panel - Riwayat Belanja & Riwayat Poin */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col">
          {/* Tabs Selector */}
          <div className="flex gap-6 mb-6 border-b border-gray-100 pb-3 flex-shrink-0">
            <button
              onClick={() => setActiveTab("orders")}
              className={`pb-1 text-sm font-bold transition cursor-pointer relative ${
                activeTab === "orders" ? "text-hijau" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Riwayat Belanja ({orders.length})
              {activeTab === "orders" && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-hijau rounded-full -mb-[14px]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("points")}
              className={`pb-1 text-sm font-bold transition cursor-pointer relative ${
                activeTab === "points" ? "text-hijau" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Riwayat Perolehan Poin ({pointsHistory.length})
              {activeTab === "points" && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-hijau rounded-full -mb-[14px]" />
              )}
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            {activeTab === "orders" ? (
              // TAB 1: RIWAYAT BELANJA
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase font-bold">
                    <th className="py-3 px-4">No. Pesanan</th>
                    <th className="py-3 px-4">Tanggal</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50 transition">
                      <td className="py-4 px-4 font-semibold text-hijau font-mono text-xs">
                        #{o.id.substring(0, 8)}
                      </td>
                      <td className="py-4 px-4 text-gray-500">
                        {new Date(o.created_at).toLocaleDateString("id-ID")}
                      </td>
                      <td className="py-4 px-4 font-bold text-gray-800">
                        Rp {Number(o.total_amount).toLocaleString("id-ID")}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                            o.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : o.status === "pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center py-10 text-gray-400">
                        Belum ada riwayat transaksi belanja.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              // TAB 2: RIWAYAT POIN
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase font-bold">
                    <th className="py-3 px-4">Tanggal</th>
                    <th className="py-3 px-4">Jumlah Poin</th>
                    <th className="py-3 px-4">Deskripsi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {pointsHistory.map((pt) => (
                    <tr key={pt.id} className="hover:bg-gray-50 transition">
                      <td className="py-4 px-4 text-gray-500">
                        {new Date(pt.created_at).toLocaleDateString("id-ID")}
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg text-xs border border-green-100">
                          +{pt.points} Poin
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600 font-medium">
                        {pt.description || "Perolehan poin transaksi"}
                      </td>
                    </tr>
                  ))}
                  {pointsHistory.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center py-10 text-gray-400">
                        Belum ada riwayat perolehan poin.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Info Detail Profil */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaUser className="text-hijau" /> Informasi Profil
            </h3>
            <div className="space-y-4 text-sm text-gray-600">
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase">Nama Lengkap</p>
                <p className="font-bold text-gray-800 mt-0.5">{profile?.full_name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase">Alamat Email</p>
                <p className="font-semibold text-gray-800 mt-0.5 break-all">{profile?.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase">Hak Akses</p>
                <span className="inline-block mt-1 rounded-lg px-3 py-1 text-[10px] font-black uppercase bg-blue-100 text-blue-600">
                  {profile?.role}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase">Tanggal Bergabung</p>
                <p className="font-medium text-gray-700 mt-0.5">
                  {profile?.created_at ? new Date(profile.created_at).toLocaleDateString("id-ID") : "-"}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={signOut}
            className="mt-8 w-full py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition cursor-pointer text-center"
          >
            Logout / Keluar
          </button>
        </div>
      </div>
    </div>
  );
}
