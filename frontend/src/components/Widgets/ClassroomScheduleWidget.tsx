import { CalendarDays } from "lucide-react";
import styles from "./Widgets.module.css";

const ClassroomScheduleWidget = () => {
    return (
        <section className={styles.infoWidget}>
            <div className={styles.infoWidgetHeader}>
                <CalendarDays size={22} />
                <h2>Dagens lektioner</h2>
            </div>

            <div className={styles.infoWidgetContent}>
                {/* Inget schema att visa just nu. */}
            </div>
        </section>
    );
};

export default ClassroomScheduleWidget;
