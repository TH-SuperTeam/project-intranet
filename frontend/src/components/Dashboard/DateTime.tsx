import { CalendarDays, Clock } from "lucide-react";
import styles from "./Dashboard.module.css";

interface DateTimeProps {
    currentTime: Date;
}

const DateTime = ({ currentTime }: DateTimeProps) => {
    const formattedDate = new Intl.DateTimeFormat("sv-SE", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(currentTime);

    const date = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    const time = new Intl.DateTimeFormat("sv-SE", {
        hour: "2-digit",
        minute: "2-digit",
    }).format(currentTime);

    return (
        <div className={styles.dateTime}>
            <span className={styles.dateTimeItem}>
                <CalendarDays size={16} />
                {date}
            </span>

            <span className={styles.dateTimeItem}>
                <Clock size={16} />
                {time}
            </span>
        </div>
    );
};

export default DateTime;
