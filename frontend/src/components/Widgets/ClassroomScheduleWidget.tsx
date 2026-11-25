import { CalendarDays } from "lucide-react"
import { useClassroomsToday } from "../../hooks/ScheduleHooks/useClassroomsToday"
import styles from "./Widgets.module.css"

const formatTime = (time: string) => time.slice(0, 5)

const ClassroomScheduleWidget = () => {
  const { data, isLoading, isError, error } = useClassroomsToday()

  return (
    <section className={`${styles.infoWidget} ${styles.classroomWidget}`}>
      <div className={styles.infoWidgetHeader}>
        <CalendarDays size={22} />
        <h2>Dagens lektioner</h2>
      </div>

      {isLoading ? (
        <p className={styles.emptyState} role="status">
          Hämtar dagens schema…
        </p>
      ) : isError ? (
        <p className={styles.widgetError} role="alert">
          {error instanceof Error ? error.message : "Dagens schema kunde inte hämtas."}
        </p>
      ) : !data?.classrooms.length ? (
        <p className={styles.emptyState}>Inga klassrum hittades.</p>
      ) : (
        <div className={styles.classroomGrid}>
          {data.classrooms.map((classroom) => {
            return (
              <article className={styles.classroomCard} key={classroom.id}>
                <h3>{classroom.name}</h3>

                {classroom.bookings.length > 0 ? (
                  classroom.bookings.map((booking) => (
                    <div
                      className={styles.classroomLesson}
                      data-school={booking.school}
                      key={`${booking.classId}-${booking.startTime}`}
                    >
                      <strong>
                        {booking.programName} {booking.className}
                      </strong>
                      <span>
                        {formatTime(booking.startTime)}–
                        {formatTime(booking.endTime)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className={styles.classroomFree}>Ledig</p>
                )}
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default ClassroomScheduleWidget
