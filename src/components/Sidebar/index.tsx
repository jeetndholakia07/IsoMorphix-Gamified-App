import NavItem from "./NavItem";
import { useRef, type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

type SidebarProps = {
  isOpen: boolean;
  onClose: any;
}

const Index: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current?.contains(event.target as Node)) {
      onClose();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Overlay on mobile when sidebar is open */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={onClose} ref={sidebarRef}
      />

      <aside
        className={`fixed z-40 top-0 left-0 h-screen w-56 bg-indigo-800 text-white transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex md:flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center space-x-3 px-4 py-5 border-b border-white/20">
          <Link to="/">
            <img src={"/assets/images/Logo.png"} alt="IsoMorphix" className="w-50 h-20" />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 py-6 space-y-3 font-medium">
          <NavItem link="/" icon={<i className="bi bi-house-door-fill mr-2" />} text={t("home")} />
          <NavItem link="/howToPlay" icon={<i className="bi bi-journal-text mr-2" />} text={t("howToPlay")} />
          <NavItem link="/game" icon={<i className="bi bi-controller mr-2" />} text={t("startGame")} />
          <NavItem link="/leaderboard" icon={<i className="bi bi-trophy mr-2" />} text={t("leaderboard")} />
        </nav>
      </aside>
    </>
  );
}
export default Index;