import { NavLink } from "react-router-dom";
import type { NavLinkProps } from "react-router-dom";
import Logo from "../components/common/Logo";
import { Home, Newspaper, Users, X } from "lucide-react";
import LogoutButton from "../components/common/LogoutButton";
import styles from "./Sidebar.module.css";

type SidebarProps = {
    isOpen: boolean;
    onNavigate: () => void;
};

const Sidebar = ({ isOpen, onNavigate }: SidebarProps) => {
    // isActive är true när användaren befinner sig på sidan som länken leder till.
    const navLinkClass: NavLinkProps["className"] = ({ isActive }) =>
        isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

    return (
        <aside
            className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
        >
            <button
                type="button"
                className={styles.closeButton}
                onClick={onNavigate}
                aria-label="Stäng meny"
            >
                <X />
            </button>
            <Logo />
            <nav className={styles.sidebarNav}>
                <NavLink
                    to="/dashboard"
                    className={navLinkClass}
                    onClick={onNavigate}
                >
                    <Home /> Dashboard
                </NavLink>

                <NavLink
                    to="/news"
                    className={navLinkClass}
                    onClick={onNavigate}
                >
                    <Newspaper /> Nyheter
                </NavLink>

                <NavLink
                    to="/users"
                    className={navLinkClass}
                    onClick={onNavigate}
                >
                    <Users /> Användare
                </NavLink>

                <div className={styles.sidebarLogout}>
                    <LogoutButton />
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
