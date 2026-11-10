import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import styles from "./MainLayout.module.css";

const MainLayout = () => {
    return (
        <div className={styles.appLayout}>
            <Sidebar />
            <main className={styles.mainLayout}>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
