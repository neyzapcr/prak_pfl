import "./assets/tailwind.css";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Components from "./pages/Components";

const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const ErrorPage = React.lazy(() => import("./components/ErrorPage"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Product = React.lazy(() => import("./pages/Product"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"))
const FiturXYZ = React.lazy(() => import("./pages/FiturXYZ"))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/components" element={<Components />} />
          <Route path="/fiturxyz" element={<FiturXYZ />} />

          <Route
            path="/error-400"
            element={
              <ErrorPage
                code="400"
                description="Bad request! Data yang dikirim tidak valid."
                image="/img/error-400.png" />
            }/>

          <Route
            path="/error-401"
            element={
              <ErrorPage
                code="401"
                description="Unauthorized! Kamu belum memiliki akses."
                image="/img/error-401.png" />
            } />

          <Route
            path="/error-403"
            element={
              <ErrorPage
                code="403"
                description="Forbidden! Kamu tidak diizinkan membuka halaman ini."
                image="/img/error-403.png" />
            } />

          <Route
            path="*"
            element={
              <ErrorPage
                code="404"
                description="What are you doing here?!"
                image="/img/error-404.png" />
            } />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
    
  );
}

export default App;