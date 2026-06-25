import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [dataForm, setDataForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (dataForm.password !== dataForm.confirmPassword) {
      setError("Password dan Konfirmasi Password tidak cocok.");
      setLoading(false);
      return;
    }

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: dataForm.email,
        password: dataForm.password,
        options: {
          data: {
            full_name: dataForm.fullName,
          },
        },
      });

      if (signUpError) throw signUpError;

      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat registrasi.");
    } finally {
      setLoading(false);
    }
  };

  const errorInfo = error ? (
    <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
      <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg flex-shrink-0" />
      <span>{error}</span>
    </div>
  ) : null;

  const successInfo = success ? (
    <div className="bg-green-100 mb-5 p-5 text-sm font-semibold text-green-700 rounded">
      Registrasi Berhasil! Anda akan dialihkan ke halaman Login...
    </div>
  ) : null;

  const loadingInfo = loading ? (
    <div className="bg-gray-200 mb-5 p-5 text-sm rounded flex items-center">
      <ImSpinner2 className="me-2 animate-spin" />
      Mendaftarkan Akun...
    </div>
  ) : null;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        Create Your Account ✨
      </h2>
      {errorInfo}
      {successInfo}
      {loadingInfo}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">
            Nama Lengkap
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={dataForm.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={dataForm.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
            placeholder="********"
            required
            minLength={6}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={dataForm.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
            placeholder="********"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mb-4"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-500">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-green-500 hover:underline font-medium">
            Login di sini
          </Link>
        </p>
      </form>
    </div>
  );
}
