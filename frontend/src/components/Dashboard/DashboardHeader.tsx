import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import Greeting from "./Greeting";
import DateTime from "./DateTime";
import styles from "./Dashboard.module.css";

interface DashboardHeaderProps {
    firstName: string;
}

const DashboardHeader = ({ firstName }: DashboardHeaderProps) => {
    const [currentTime, setCurrentTime] = useState(() => new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60_000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.welcomeHeader}>
            <div className={styles.welcomeLeft}>
                <div className={styles.welcomeAvatar} aria-hidden="true">
                    <UserRound size={36} strokeWidth={1.5} />
                </div>

                <Greeting firstName={firstName} currentTime={currentTime} />
            </div>

            <DateTime currentTime={currentTime} />
        </div>
    );
};

export default DashboardHeader;
