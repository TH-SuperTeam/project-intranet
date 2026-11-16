import styles from "./Widgets.module.css";
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

    //Math.ceil avrundar uppåt
    const minutesUntilDeparture = Math.ceil(
        (new Date(departure.estimatedDeparture).getTime() - Date.now()) / 60000,
    );

    return (
        <li className={styles.departureCard}>
            <div className={styles.departureHeader}>
                <span
                    className={`${styles.departureLine} ${
                        departure.destination.includes("Annehem")
                            ? styles.departureLineDirectionOne
                            : styles.departureLineDirectionTwo
                    }`}
                >
                    {departure.lineNumber}
                </span>

                <p className={styles.departureDestination}>
                    {departure.destination.includes("Annehem")
                        ? `${departure.destination} via Lund C`
                        : departure.destination}
                </p>

                <div className={styles.departureTimes}>
                    {differenceInMinutes !== 0 && (
                        <time
                            dateTime={departure.scheduledDeparture}
                            className={styles.departureScheduled}
                        >
                            {formattedScheduledTime}
                        </time>
                    )}

                    <time
                        dateTime={departure.estimatedDeparture}
                        className={styles.departureTime}
                    >
                        {formattedEstimatedTime}
                    </time>
                </div>
            </div>

            <div className={styles.departureDetails}>
                <span className={styles.departureCountdown}>
                    {minutesUntilDeparture} min kvar
                </span>

                {differenceInMinutes !== 0 && (
                    <span
                        className={
                            differenceInMinutes > 0
                                ? styles.departureDelay
                                : styles.departureEarly
                        }
                    >
                        {differenceInMinutes > 0
                            ? `${differenceInMinutes} min försening`
                            : `${Math.abs(differenceInMinutes)} min tidigare`}
                    </span>
                )}
            </div>
        </li>
    );
};

export default DepartureCard;
