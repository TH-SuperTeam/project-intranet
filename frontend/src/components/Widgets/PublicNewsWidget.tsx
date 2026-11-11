import { Megaphone } from "lucide-react";
import styles from "./Widgets.module.css";

const PublicNewsWidget = () => {
    return (
        <section className={styles.infoWidget}>
            <div className={styles.infoWidgetHeader}>
                <Megaphone size={22} />
                <h2>Aktuellt på skolan</h2>
            </div>

            <div className={styles.infoWidgetContent}>
                {/* Ingen information att visa just nu */}
            </div>
        </section>
    );
};

export default PublicNewsWidget;
