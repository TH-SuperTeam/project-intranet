import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import styles from "./MainLayout.module.css";
import { useState } from "react";
import { Menu } from "lucide-react";

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className={styles.appLayout}>
            <button
                type="button"
                className={styles.menuButton}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label="Öppna meny"
            >
                <Menu />
            </button>
            <Sidebar
                isOpen={isSidebarOpen}
                onNavigate={() => setIsSidebarOpen(false)}
            />
            {isSidebarOpen && (
                <button
                    type="button"
                    className={styles.backdrop}
                    aria-label="Stäng meny"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
            <main className={styles.mainContent}>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
