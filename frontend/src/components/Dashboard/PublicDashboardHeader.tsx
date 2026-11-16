import Logo from "../common/Logo";
import Greeting from "./Greeting";
import DateTime from "./DateTime";
import styles from "./Dashboard.module.css";
import { useCurrentTime } from "../../hooks/useCurrentTime";

const PublicDashboardHeader = () => {
    const currentTime = useCurrentTime();

    return (
        <header className={styles.welcomeHeader}>
            <div className={styles.publicHeaderLeft}>
                <Logo
                    variant="horizontal"
                    className={styles.publicHeaderLogo}
                />

                <div className={styles.publicWelcomeText}>
                    <Greeting currentTime={currentTime} isPublic />
                </div>
            </div>

            <div className={styles.publicDateTime}>
                <DateTime currentTime={currentTime} />
            </div>
        </header>
    );
};

export default PublicDashboardHeader;
