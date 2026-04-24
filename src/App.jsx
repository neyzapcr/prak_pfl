import "./assets/tailwind.css";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import ErrorPage from "./components/ErrorPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex flex-row flex-1">
        <Sidebar />

        <div className="flex-1 p-4">
          <Header />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />

            <Route
              path="/error-400"
              element={
                <ErrorPage
                  code="400"
                  description="Bad request! Data yang dikirim tidak valid."
                  image="/img/error-400.png"/>
              }/>

            <Route
              path="/error-401"
              element={
                <ErrorPage
                  code="401"
                  description="Unauthorized! Kamu belum memiliki akses."
                  image="/img/error-401.png"/>
              }/>

            <Route
              path="/error-403"
              element={
                <ErrorPage
                  code="403"
                  description="Forbidden! Kamu tidak diizinkan membuka halaman ini."
                  image="/img/error-403.png"/>
              }/>

            <Route
              path="*"
              element={
                <ErrorPage
                  code="404"
                  description="What are you doing here?!"
                  image="/img/error-404.png"/>
              }/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;