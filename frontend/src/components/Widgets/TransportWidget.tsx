import { BusFront } from "lucide-react";
import styles from "./Widgets.module.css";

const TransportWidget = () => {
    return (
        <section className={styles.infoWidget}>
            <header className={styles.infoWidgetHeader}>
                <BusFront size={24} aria-hidden="true" />
                <h2>Bussar från Lund Brunngård</h2>
            </header>

            <div className={styles.infoWidgetContent}>
                {/* Avgångar kommer senare */}
            </div>
        </section>
    );
};

export default TransportWidget;
