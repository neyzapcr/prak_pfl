import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import FormModal from "../components/FormModal";
import { supabase } from "../services/supabaseClient";
import { FaTrash, FaPlus } from "react-icons/fa";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Form State untuk Order Baru
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderStatus, setOrderStatus] = useState("pending");

  // State Sementara untuk Item Produk yang Sedang Dipilih
  const [currentProductId, setCurrentProductId] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState(1);

  // Detail Item untuk Mode View/Edit
  const [viewOrderItems, setViewOrderItems] = useState([]);

  // Fetch seluruh data pesanan, pelanggan, dan produk
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Orders joined with Customer name
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select(`
          *,
          customers (
            name
          )
        `)
        .order("created_at", { ascending: false });

      if (orderError) throw orderError;
      setOrders(orderData || []);

      // 2. Fetch Customers
      const { data: customerData, error: customerError } = await supabase
        .from("customers")
        .select("id, name, profile_id")
        .order("name");

      if (customerError) throw customerError;
      setCustomers(customerData || []);

      // 3. Fetch Products
      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("id, name, price, stock")
        .order("name");

      if (productError) throw productError;
      setProducts(productData || []);
    } catch (err) {
      console.error("Gagal memuat data:", err.message);
      alert("Gagal memuat data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchOrderItems = async (orderId) => {
    try {
      const { data, error } = await supabase
        .from("order_items")
        .select(`
          *,
          products (
            name
          )
        `)
        .eq("order_id", orderId);

      if (error) throw error;
      setViewOrderItems(data || []);
    } catch (err) {
      console.error("Gagal memuat detail item pesanan:", err.message);
    }
  };

  const openAddModal = () => {
    setSelectedIndex(null);
    setSelectedCustomer("");
    setSelectedItems([]);
    setOrderStatus("pending");
    setCurrentProductId("");
    setCurrentQuantity(1);
    setIsModalOpen(true);
  };

  const openEditModal = async (order, index) => {
    setSelectedIndex(index);
    setOrderStatus(order.status);
    setSelectedCustomer(order.customer_id || "");
    setIsModalOpen(true);
    await fetchOrderItems(order.id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIndex(null);
    setSelectedCustomer("");
    setSelectedItems([]);
    setViewOrderItems([]);
  };

  // Logika Tambah Item Produk ke List Belanja Sementara
  const handleAddItem = () => {
    if (!currentProductId || currentQuantity <= 0) return;

    const product = products.find((p) => p.id === currentProductId);
    if (!product) return;

    // Cek apakah produk sudah ada di list
    const existingIndex = selectedItems.findIndex((item) => item.product_id === currentProductId);

    const price = Number(product.price);
    const subtotal = price * currentQuantity;

    if (existingIndex > -1) {
      const updated = [...selectedItems];
      updated[existingIndex].quantity += currentQuantity;
      updated[existingIndex].subtotal = updated[existingIndex].quantity * price;
      setSelectedItems(updated);
    } else {
      setSelectedItems([
        ...selectedItems,
        {
          product_id: currentProductId,
          name: product.name,
          quantity: currentQuantity,
          price,
          subtotal,
        },
      ]);
    }

    // Reset pilihan produk sementara
    setCurrentProductId("");
    setCurrentQuantity(1);
  };

  const handleRemoveItem = (index) => {
    const updated = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(updated);
  };

  // Hitung total_amount otomatis
  const calculateTotal = () => {
    return selectedItems.reduce((sum, item) => sum + item.subtotal, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (selectedIndex !== null) {
        // Mode Edit (Hanya update status)
        const orderToUpdate = orders[selectedIndex];
        const { error } = await supabase
          .from("orders")
          .update({ status: orderStatus })
          .eq("id", orderToUpdate.id);

        if (error) throw error;
      } else {
        // Mode Tambah Baru (Transaksi orders & order_items)
        if (!selectedCustomer) {
          alert("Silakan pilih pelanggan terlebih dahulu.");
          setLoading(false);
          return;
        }
        if (selectedItems.length === 0) {
          alert("Silakan tambahkan minimal satu produk.");
          setLoading(false);
          return;
        }

        const totalAmount = calculateTotal();

        // Cari profile_id dari pelanggan yang dipilih untuk otomatis dimasukkan ke member_id
        const customer = customers.find((c) => c.id === selectedCustomer);
        const memberId = customer?.profile_id || null;

        // 1. Simpan data utama ke tabel orders
        const { data: newOrder, error: orderError } = await supabase
          .from("orders")
          .insert([
            {
              customer_id: selectedCustomer,
              member_id: memberId,
              total_amount: totalAmount,
              status: orderStatus,
            },
          ])
          .select()
          .single();

        if (orderError) throw orderError;

        // 2. Simpan detail produk ke tabel order_items
        const orderItemsPayload = selectedItems.map((item) => ({
          order_id: newOrder.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.subtotal,
        }));

        const { error: itemsError } = await supabase
          .from("order_items")
          .insert(orderItemsPayload);

        if (itemsError) throw itemsError;
      }

      closeModal();
      await fetchData();
    } catch (err) {
      console.error("Gagal menyimpan pesanan:", err.message);
      alert("Gagal menyimpan pesanan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus pesanan ini?")) return;

    setLoading(true);
    try {
      // 1. Hapus order_items terkait terlebih dahulu
      const { error: itemsError } = await supabase
        .from("order_items")
        .delete()
        .eq("order_id", orderId);

      if (itemsError) throw itemsError;

      // 2. Hapus order utama
      const { error: orderError } = await supabase
        .from("orders")
        .delete()
        .eq("id", orderId);

      if (orderError) throw orderError;

      await fetchData();
    } catch (err) {
      console.error("Gagal menghapus pesanan:", err.message);
      alert("Gagal menghapus pesanan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    if (status === "completed") return "bg-green-100 text-green-600";
    if (status === "pending") return "bg-yellow-100 text-yellow-600";
    return "bg-red-100 text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Orders" breadcrumb={["Orders"]}>
        <button
          onClick={openAddModal}
          className="bg-hijau text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:opacity-90 transition cursor-pointer"
        >
          + Add Orders
        </button>
      </PageHeader>

      <div className="p-6">
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs font-bold uppercase text-gray-400">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total Price</th>
                <th className="px-6 py-4">Order Date</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {loading && orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    Memuat data pesanan...
                  </td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <tr key={order.id} className="transition hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-hijau font-mono text-xs">
                      #{order.id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-700">
                      {order.customers?.name || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-black uppercase ${getStatusClass(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold">
                      Rp {Number(order.total_amount || 0).toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(order.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(order, index)}
                          className="rounded-xl bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600 cursor-pointer"
                        >
                          Detail / Edit
                        </button>
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="rounded-xl bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600 cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              {!loading && orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-400">
                    Belum ada data transaksi pesanan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedIndex !== null ? "Detail & Edit Status Pesanan" : "Buat Pesanan Baru"}
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {selectedIndex === null ? (
            // MODE TAMBAH BARU (Buat Pesanan)
            <>
              {/* Pilih Pelanggan */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Pilih Pelanggan
                </label>
                <select
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-3 outline-none bg-white"
                  required
                >
                  <option value="">-- Pilih Pelanggan --</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selector Produk */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <p className="font-bold text-gray-700 mb-3 text-xs uppercase tracking-wide">
                  Tambah Item Produk
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 mb-1">
                      Pilih Produk
                    </label>
                    <select
                      value={currentProductId}
                      onChange={(e) => setCurrentProductId(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 p-2.5 outline-none bg-white text-xs"
                    >
                      <option value="">-- Produk --</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} - Rp {Number(p.price).toLocaleString("id-ID")}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 mb-1">
                      Jumlah (Quantity)
                    </label>
                    <input
                      type="number"
                      value={currentQuantity}
                      onChange={(e) => setCurrentQuantity(Math.max(1, Number(e.target.value)))}
                      className="w-full rounded-xl border border-gray-200 p-2.5 outline-none text-xs"
                      min={1}
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="w-full bg-hijau hover:opacity-90 text-white font-semibold py-2.5 px-4 rounded-xl transition cursor-pointer text-xs flex items-center justify-center gap-2"
                    >
                      <FaPlus /> Tambah Item
                    </button>
                  </div>
                </div>
              </div>

              {/* List Item yang Dipilih */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2">
                  Item Belanja
                </label>
                <div className="border border-gray-100 rounded-2xl overflow-hidden max-h-48 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-100 text-gray-500 font-bold">
                      <tr>
                        <th className="p-3">Nama Produk</th>
                        <th className="p-3 text-center">Qty</th>
                        <th className="p-3 text-right">Harga</th>
                        <th className="p-3 text-right">Subtotal</th>
                        <th className="p-3 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {selectedItems.map((item, i) => (
                        <tr key={i}>
                          <td className="p-3 font-semibold">{item.name}</td>
                          <td className="p-3 text-center">{item.quantity}</td>
                          <td className="p-3 text-right">
                            Rp {item.price.toLocaleString("id-ID")}
                          </td>
                          <td className="p-3 text-right font-bold text-gray-800">
                            Rp {item.subtotal.toLocaleString("id-ID")}
                          </td>
                          <td className="p-3 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(i)}
                              className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {selectedItems.length === 0 && (
                        <tr>
                          <td colSpan="5" className="text-center py-6 text-gray-400">
                            Belum ada produk yang ditambahkan.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total Belanja */}
              <div className="border-t border-gray-100 pt-4 flex justify-between items-center font-bold">
                <span className="text-gray-500">Total Pembayaran:</span>
                <span className="text-xl text-hijau">
                  Rp {calculateTotal().toLocaleString("id-ID")}
                </span>
              </div>
            </>
          ) : (
            // MODE DETAIL & EDIT STATUS
            <>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-2">
                <p>
                  <strong>No. Pesanan:</strong> #{orders[selectedIndex]?.id}
                </p>
                <p>
                  <strong>Nama Pelanggan:</strong> {orders[selectedIndex]?.customers?.name || "-"}
                </p>
                <p>
                  <strong>Tanggal Transaksi:</strong>{" "}
                  {new Date(orders[selectedIndex]?.created_at).toLocaleString("id-ID")}
                </p>
              </div>

              {/* Detail Items */}
              <div>
                <p className="font-bold text-gray-700 mb-2">Daftar Item Belanja</p>
                <div className="border border-gray-100 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-100 text-gray-500 font-bold">
                      <tr>
                        <th className="p-3">Nama Produk</th>
                        <th className="p-3 text-center">Qty</th>
                        <th className="p-3 text-right">Harga</th>
                        <th className="p-3 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {viewOrderItems.map((item) => (
                        <tr key={item.id}>
                          <td className="p-3 font-semibold">{item.products?.name || "Produk dihapus"}</td>
                          <td className="p-3 text-center">{item.quantity}</td>
                          <td className="p-3 text-right">
                            Rp {Number(item.price).toLocaleString("id-ID")}
                          </td>
                          <td className="p-3 text-right font-bold text-gray-800">
                            Rp {Number(item.subtotal).toLocaleString("id-ID")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total Belanja */}
              <div className="flex justify-between items-center font-bold text-base border-t border-gray-100 pt-4">
                <span className="text-gray-500">Total Harga:</span>
                <span className="text-lg text-hijau">
                  Rp {Number(orders[selectedIndex]?.total_amount || 0).toLocaleString("id-ID")}
                </span>
              </div>

              {/* Ubah Status Pesanan */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Ubah Status Pesanan
                </label>
                <select
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-3 outline-none bg-white"
                  required
                >
                  <option value="pending">Pending (Diproses)</option>
                  <option value="completed">Completed (Selesai)</option>
                  <option value="cancelled">Cancelled (Dibatalkan)</option>
                </select>
              </div>
            </>
          )}

          {/* Form Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="rounded-xl bg-hijau px-5 py-3 font-bold text-white cursor-pointer flex-1"
            >
              {selectedIndex !== null ? "Simpan Perubahan" : "Buat Pesanan"}
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="rounded-xl bg-gray-200 px-5 py-3 font-bold text-gray-700 cursor-pointer flex-1"
            >
              Batal
            </button>
          </div>
        </form>
      </FormModal>
    </div>
  );
}