import { CloudSun } from "lucide-react";
import styles from "./Widgets.module.css";

const WeatherWidget = () => {
    return (
        <section className={styles.infoWidget}>
            <header className={styles.infoWidgetHeader}>
                <CloudSun size={24} aria-hidden="true" />
                <h2>Vädret i Lund</h2>
            </header>

            <div className={styles.infoWidgetContent}>
                {/* Väderinformation kommer senare */}
            </div>
        </section>
    );
};

export default WeatherWidget;
