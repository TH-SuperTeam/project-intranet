import styles from "./Widgets.module.css";
import DepartureCard from "./DepartureCard";
import type { Departure } from "../../types/Departure";
import { useTransport } from "../../hooks/useTransport";
import { useEffect, useState } from "react";

const DepartureList = () => {
    const { data: departures, isPending, isError } = useTransport();

    //renderar komponenten var 20e sekund för att filtrera bort redan gångna bussar
    const [, setTick] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTick(tick => tick + 1);
        }, 20 * 1000);

        return () => clearInterval(interval);
    }, []);

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

    const upcomingDepartures = (departures ?? [])
        .filter(
            departure =>
                new Date(departure.estimatedDeparture).getTime() > Date.now(),
        )
        .slice(0, 4);

    if (upcomingDepartures.length === 0) {
        return (
            <div className={styles.emptyState}>
                <h3>Inga avgångar att visa</h3>
                <p>Det finns inga kommande avgångar just nu.</p>
            </div>
        );
    }

    return (
        <>
            <ul className={styles.departureList}>
                {upcomingDepartures.map((departure: Departure) => (
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
