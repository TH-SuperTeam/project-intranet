import { NavLink } from "react-router-dom";
import type { NavLinkProps } from "react-router-dom";
import Logo from "./Logo";
import { Home, LogOut, Newspaper, Users } from "lucide-react";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
    const navLinkClass: NavLinkProps["className"] = ({ isActive }) =>
        isActive ? "nav-link active" : "nav-link";

    return (
        <aside className="sidebar">
            <Logo />
            <nav className="sidebar-nav">
                <NavLink to="/dashboard" className={navLinkClass}>
                    <Home /> Dashboard
                </NavLink>

                <NavLink to="/news" className={navLinkClass}>
                    <Newspaper /> Nyheter
                </NavLink>

                <NavLink to="/users" className={navLinkClass}>
                    <Users /> Användare
                </NavLink>

                <div className="sidebar-logout">
                    <LogOut />
                    <LogoutButton />
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
