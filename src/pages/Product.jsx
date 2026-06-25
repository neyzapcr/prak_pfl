import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import FormModal from "../components/FormModal";
import { supabase } from "../services/supabaseClient";

const emptyProduct = {
  id: "",
  name: "",
  description: "",
  price: "",
  stock: "",
};

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [formData, setFormData] = useState(emptyProduct);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error("Gagal memuat produk:", err.message);
      alert("Gagal memuat produk: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setSelectedIndex(null);
    setFormData(emptyProduct);
    setIsModalOpen(true);
  };

  const openEditModal = (product, index) => {
    setSelectedIndex(index);
    setFormData({
      id: product.id,
      name: product.name,
      description: product.description || "",
      price: product.price,
      stock: product.stock,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIndex(null);
    setFormData(emptyProduct);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        stock: formData.stock,
      };

      if (selectedIndex !== null) {
        // Mode Edit
        const { error } = await supabase
          .from("products")
          .update(payload)
          .eq("id", formData.id);

        if (error) throw error;
      } else {
        // Mode Tambah Baru
        const { error } = await supabase
          .from("products")
          .insert([payload]);

        if (error) throw error;
      }

      closeModal();
      await fetchProducts();
    } catch (err) {
      console.error("Gagal menyimpan produk:", err.message);
      alert("Gagal menyimpan produk: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;
      await fetchProducts();
    } catch (err) {
      console.error("Gagal menghapus produk:", err.message);
      alert("Gagal menghapus produk: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const filtered = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Products" breadcrumb={["Products"]}>
        <button
          onClick={openAddModal}
          className="bg-hijau text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:opacity-90 transition cursor-pointer"
        >
          + Add Product
        </button>
      </PageHeader>

      <div className="px-8 pb-10">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 bg-white rounded-xl px-4 py-2 outline-none w-full max-w-sm focus:ring-2 focus:ring-green-100 focus:border-hijau transition"
          />
        </div>

        <div className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100 bg-gray-50 text-sm uppercase text-gray-400">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {loading && products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    Memuat data produk...
                  </td>
                </tr>
              ) : (
                filtered.map((item, index) => (
                  <tr key={item.id} className="transition hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-400">{index + 1}.</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/products/${item.id}`}
                        className="text-emerald-500 hover:text-emerald-600 font-semibold hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                      {item.description || "-"}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-800">
                      Rp {Number(item.price).toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-lg px-3 py-1 text-xs font-bold ${
                          item.stock <= 5
                            ? "bg-red-100 text-red-600"
                            : item.stock <= 15
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {item.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(item, index)}
                          className="rounded-xl bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="rounded-xl bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600 cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-400">
                    Tidak ada produk ditemukan.
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
        title={selectedIndex !== null ? "Edit Product" : "Add Product"}
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Nama Produk
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama produk"
              className="w-full rounded-xl border border-gray-200 p-3 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Harga (Rp)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Masukkan harga produk"
              className="w-full rounded-xl border border-gray-200 p-3 outline-none"
              required
              min={0}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Stok Produk
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Masukkan jumlah stok"
              className="w-full rounded-xl border border-gray-200 p-3 outline-none"
              required
              min={0}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Deskripsi Produk
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Masukkan deskripsi produk"
              className="w-full rounded-xl border border-gray-200 p-3 outline-none h-24 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="rounded-xl bg-hijau px-5 py-3 font-bold text-white cursor-pointer flex-1"
            >
              {selectedIndex !== null ? "Update Produk" : "Simpan Produk"}
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