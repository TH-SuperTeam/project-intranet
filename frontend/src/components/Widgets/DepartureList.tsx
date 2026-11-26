import styles from "./Widgets.module.css"
import DepartureCard from "./DepartureCard"
import type { Departure } from "../../types/Departure"
import { useTransport } from "../../hooks/useTransport"
import { useEffect, useState } from "react"
import ErrorState from "../errors/ErrorState"
import { ListSkeleton } from "../Loaders/Skeletons/ListSkeleton"

const DepartureList = () => {
  const { data: departures, isPending, isError } = useTransport()

  //renderar komponenten var 20e sekund för att filtrera bort redan gångna bussar
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    const updateNow = () => setNow(Date.now())

    updateNow()

    const interval = setInterval(updateNow, 20 * 1000)

    return () => clearInterval(interval)
  }, [])

  if (isPending) {
    return <ListSkeleton count={3} />
  }

  if (isError) {
    return <ErrorState resource="avgångarna" />
  }

  if (now === null) {
    return <ListSkeleton count={3} />
  }

  const upcomingDepartures = (departures ?? [])
    .filter((departure) => new Date(departure.estimatedDeparture).getTime() > now)
    .slice(0, 4)

  if (upcomingDepartures.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>Inga avgångar att visa</h3>
        <p>Det finns inga kommande avgångar just nu.</p>
      </div>
    )
  }

  return (
    <>
      <ul className={styles.departureList}>
        {upcomingDepartures.map((departure: Departure) => (
          <DepartureCard key={departure.scheduledDeparture} departure={departure} now={now} />
        ))}
      </ul>
    </>
  )
}

export default DepartureList
