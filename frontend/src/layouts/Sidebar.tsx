import { NavLink } from "react-router-dom"
import type { NavLinkProps } from "react-router-dom"
import Logo from "../components/common/Logo"
import { Home, Newspaper, UserIcon, Users, X, CalendarDays } from "lucide-react"
import LogoutButton from "../components/common/LogoutButton"
import VHHeart from "../assets/vh-heart.svg?react"
import VHNotes from "../assets/vh-notes.svg?react"
import { useAuth } from "../hooks/useAuth"
import styles from "./Sidebar.module.css"

type SidebarProps = {
  isOpen: boolean
  onNavigate: () => void
}

const Sidebar = ({ isOpen, onNavigate }: SidebarProps) => {
  const { user } = useAuth()
  // isActive är true när användaren befinner sig på sidan som länken leder till.
  const navLinkClass: NavLinkProps["className"] = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
      <button type="button" className={styles.closeButton} onClick={onNavigate} aria-label="Stäng meny">
        <X />
      </button>
      <Logo variant="stacked" className={styles.sidebarLogo} />
      <nav className={styles.sidebarNav}>
        <NavLink to="/dashboard" className={navLinkClass} onClick={onNavigate}>
          <Home /> Dashboard
        </NavLink>

        <NavLink to="/schedule" className={navLinkClass} onClick={onNavigate}>
          <CalendarDays /> Schema
        </NavLink>

        <NavLink to="/profile" className={navLinkClass} onClick={onNavigate}>
          <UserIcon /> Min Profil
        </NavLink>

        <NavLink to="/news" className={navLinkClass} onClick={onNavigate}>
          <Newspaper /> Nyheter
        </NavLink>

        <NavLink to="/users" className={navLinkClass} onClick={onNavigate}>
          <Users /> Användare
        </NavLink>

        <div className={styles.sidebarLogout}>
          <LogoutButton />
        </div>
      </nav>
      {user?.school === "VH" ? (
        <div className={styles.vhDecoration} aria-hidden="true">
          <VHNotes className={styles.vhNotes} />
          <VHHeart className={styles.vhHeart} />
        </div>
      ) : (
        <div className={styles.sidebarDecoration} aria-hidden="true" />
      )}
    </aside>
  )
}

export default Sidebar
