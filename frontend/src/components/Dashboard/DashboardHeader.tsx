import Greeting from "./Greeting";
import DateTime from "./DateTime";
import styles from "./Dashboard.module.css";
import { useCurrentTime } from "../../hooks/useCurrentTime";
import UserAvatar from "../common/UserAvatar";
import { Link } from "react-router-dom";
import type { SchoolName } from "../../types/SchoolName";

interface DashboardHeaderProps {
    firstName: string;
    profileImageUrl?: string | null;
    school?: SchoolName | null;
}

const DashboardHeader = ({
    firstName,
    profileImageUrl,
    school,
}: DashboardHeaderProps) => {
    const currentTime = useCurrentTime();

    return (
        <div
            className={`${styles.welcomeHeader} ${school === "TH" ? styles.thHeader : ""}`}
        >
            <div className={styles.welcomeLeft}>
                <Link to="/profile">
                    <UserAvatar size={60} profileImageUrl={profileImageUrl} />
                </Link>
                <Greeting firstName={firstName} currentTime={currentTime} />
            </div>

            <DateTime currentTime={currentTime} />
        </div>
    );
};

export default DashboardHeader;
