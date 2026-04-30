import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex flex-row flex-1">
        <Sidebar />

        <div className="flex-1 p-4">
          <Header />

          <Outlet />
        </div>
      </div>
    </div>
  );
}
