import { useEffect, useState } from "react";
import Logo from "../common/Logo";
import DateTime from "./DateTime";
import styles from "./Dashboard.module.css";

const PublicDashboardHeader = () => {
    const [currentTime, setCurrentTime] = useState(() => new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60_000);

        return () => clearInterval(interval);
    }, []);

    return (
        <header className={styles.welcomeHeader}>
            <div className={styles.welcomeLeft}>
                <Logo
                    variant="horizontal"
                    className={styles.publicHeaderLogo}
                />
            </div>

            <DateTime currentTime={currentTime} />
        </header>
    );
};

export default PublicDashboardHeader;
