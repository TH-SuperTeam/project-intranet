import styles from "./Dashboard.module.css";
import type { ReactNode } from "react";

interface DashboardLayoutProps {
    header: ReactNode;
    mainWidget: ReactNode;
    sideWidgets: ReactNode;
}

const DashboardLayout = ({
    header,
    mainWidget,
    sideWidgets,
}: DashboardLayoutProps) => {
    return (
        <section className={styles.dashboard}>
            <header className={styles.dashboardHeader}>{header}</header>

            <div className={styles.widgetGrid}>
                <div className={styles.widgetMain}>{mainWidget}</div>

                <div className={styles.widgetColumn}>{sideWidgets}</div>
            </div>
        </section>
    );
};

export default DashboardLayout;
