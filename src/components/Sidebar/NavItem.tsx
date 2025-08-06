import type { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";

type NavItemProps = {
    icon: React.ReactNode;
    link: string;
    text: string;
}

const NavItem: FC<NavItemProps> = ({ icon, link, text }) => {
    const isActive = useLocation().pathname == link;
    return (
        <NavLink to={link} className={`flex items-center px-3 py-2 rounded hover:bg-indigo-700 transition 
        ${isActive ? "bg-indigo-700 font-bold" : ""}`}>
            {icon}
            {text}
        </NavLink>
    )
}
export default NavItem;