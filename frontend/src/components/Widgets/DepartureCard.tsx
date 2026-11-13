import styles from "./News.module.css";
import type { Departure } from "../../types/Departure";

interface DepartureCardProps {
    departure: Departure;
}

const DepartureCard = ({ departure }: DepartureCardProps) => {
    const formattedScheduledTime = new Date(
        departure.scheduledDeparture,
    ).toLocaleTimeString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const formattedEstimatedTime = new Date(
        departure.estimatedDeparture,
    ).toLocaleTimeString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const difference =
        new Date(departure.estimatedDeparture).getTime() -
        new Date(departure.scheduledDeparture).getTime();

    //Math.round gör att vi får ett helt antal minuter:
    const differenceInMinutes = Math.round(difference / 60000);

    return (
        <li className={styles.newsCard}>
            <div className={styles.cardHeader}>
                <h2 className={styles.title}>{departure.lineNumber}</h2>
                <p>{departure.destination}</p>
                <div>
                    <p>Planerad avgångstid: </p>
                    <time
                        dateTime={departure.scheduledDeparture}
                        className={styles.date}
                    >
                        {formattedScheduledTime}
                    </time>
                </div>
                {differenceInMinutes > 0 && (
                    <div>
                        <p>Beräknad avgångstid: {formattedEstimatedTime}</p>
                    </div>
                )}
            </div>
        </li>
    );
};

export default DepartureCard;
