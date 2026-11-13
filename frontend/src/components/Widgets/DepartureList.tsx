import styles from "./Users.module.css";
import DepartureCard from "./DepartureCard";
import type { Departure } from "../../types/Departure";
import { useTransport } from "../../hooks/useTransport";

const DepartureList = () => {
    const { data: departures, isPending, isError } = useTransport();

    if (isPending) {
        return <div className={styles.state}>Laddar avgångar...</div>;
    }

    if (isError) {
        return (
            <div className={styles.errorState} role="alert">
                Det gick inte att ladda avgångarna.
            </div>
        );
    }

    if (departures.length === 0) {
        return (
            <div className={styles.emptyState}>
                <h3>Inga avgångar att visa</h3>
                <p>Det finns inga kommande avgångar just nu.</p>
            </div>
        );
    }

    return (
        <>
            <ul className={styles.DepartureList}>
                {departures.map((departure: Departure) => (
                    <DepartureCard
                        key={departure.scheduledDeparture}
                        departure={departure}
                    />
                ))}
            </ul>
        </>
    );
};

export default DepartureList;
