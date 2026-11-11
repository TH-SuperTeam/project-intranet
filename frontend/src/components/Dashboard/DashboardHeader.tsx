import Greeting from "./Greeting";
import DateTime from "./DateTime";
import styles from "./Dashboard.module.css";
import { useCurrentTime } from "../../hooks/useCurrentTime";
import UserAvatar from "../common/UserAvatar";

interface DashboardHeaderProps {
    firstName: string;
}

const DashboardHeader = ({ firstName }: DashboardHeaderProps) => {
    const currentTime = useCurrentTime();

    return (
        <div className={styles.welcomeHeader}>
            <div className={styles.welcomeLeft}>
                <UserAvatar size={60} />

                <Greeting firstName={firstName} currentTime={currentTime} />
            </div>

            <DateTime currentTime={currentTime} />
        </div>
    );
};

export default DashboardHeader;
