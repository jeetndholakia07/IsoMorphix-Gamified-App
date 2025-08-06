import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {t} = useTranslation();

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-b from-indigo-900 to-purple-800 text-white">
      {/* Sidebar */}
      <div className="flex-shrink-0 h-full">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content wrapper */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Mobile topbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shadow-md md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white text-2xl focus:outline-none"
            aria-label="Open menu"
          >
            <i className="bi bi-list"></i>
            <span className="font-bold text-2xl ml-5">{t("isomorphix")}</span>
          </button>
        </div>

        {/* Desktop header */}
        <div className="hidden md:block p-6 border-b border-white/20 shadow-md">
          <Header />
        </div>

        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto px-4 pt-6 md:px-6 md:pt-6 pb-0 max-h-screen">
          <Outlet />
        </main>

        {/* Footer */}
        <div className="border-t border-white/10 mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
export default MainLayout;