import { NavLink } from "react-router-dom";
import type { NavLinkProps } from "react-router-dom";
import Logo from "../components/common/Logo";
import { Home, Newspaper, Users } from "lucide-react";
import LogoutButton from "../components/common/LogoutButton";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
    // isActive är true när användaren befinner sig på sidan som länken leder till.
    const navLinkClass: NavLinkProps["className"] = ({ isActive }) =>
        isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

    return (
        <aside className={styles.sidebar}>
            <Logo />
            <nav className={styles.sidebarNav}>
                <NavLink to="/dashboard" className={navLinkClass}>
                    <Home /> Dashboard
                </NavLink>

                <NavLink to="/news" className={navLinkClass}>
                    <Newspaper /> Nyheter
                </NavLink>

                <NavLink to="/users" className={navLinkClass}>
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
