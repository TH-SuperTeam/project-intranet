import DashboardLayout from "../components/Dashboard/DashboardLayout";
import PublicDashboardHeader from "../components/Dashboard/PublicDashboardHeader";
import ClassroomScheduleWidget from "../components/Widgets/ClassroomScheduleWidget";
import PublicNewsWidget from "../components/Widgets/PublicNewsWidget";
import WeatherWidget from "../components/Widgets/WeatherWidget";
import TransportWidget from "../components/Widgets/TransportWidget";
import styles from "../components/Dashboard/Dashboard.module.css";

const PublicDashboardPage = () => {
    return (
        <div className={styles.publicDashboard}>
            <DashboardLayout
                header={<PublicDashboardHeader />}
                mainWidget={
                    <div className={styles.publicWidgetGrid}>
                        <ClassroomScheduleWidget />
                        <PublicNewsWidget />
                    </div>
                }
                sideWidgets={
                    <>
                        <WeatherWidget />
                        <TransportWidget />
                    </>
                }
            />
        </div>
    );
};

export default PublicDashboardPage;
