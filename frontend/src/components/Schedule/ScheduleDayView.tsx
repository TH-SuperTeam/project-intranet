import { Pencil } from "lucide-react"
import type { Classroom } from "../../types/Classroom"
import type { WeeklySchedule } from "../../types/WeeklySchedule"
import styles from "../../pages/SchedulePage.module.css"
import type { DisplayLesson } from "../../types/ScheduleView"
import { formatTime, getOverrideLabel } from "../../utils/schedule/scheduleUtils"

type Props = {
  rooms: Classroom[]
  lessons: DisplayLesson[]
  date: Date
  canManageSchedule: boolean
  getClassDisplayName: (classId: number, className: string) => string
  getClassSchool: (classId: number) => string | undefined
  onQuickChange: (schedule: WeeklySchedule, date: Date) => void
}

const ScheduleDayView = ({
  rooms,
  lessons,
  date,
  canManageSchedule,
  getClassDisplayName,
  getClassSchool,
  onQuickChange,
}: Props) => {
  if (rooms.length === 0) {
    return <p className={styles.empty}>Inga klassrum hittades.</p>
  }

  return (
    <div className={styles.dayGrid}>
      {rooms.map((room) => {
        const roomLessons = lessons.filter((lesson) => lesson.classroomId === room.id)

        return (
          <section className={styles.room} key={room.id}>
            <h3>{room.name}</h3>
            {roomLessons.length === 0 ? (
              <p className={styles.available}>Ledigt</p>
            ) : (
              roomLessons.map((lesson) => (
                <article
                  className={styles.lesson}
                  data-school={getClassSchool(lesson.schedule.classId)}
                  key={`${lesson.schedule.id}-${lesson.classroomId}`}>
                  <strong>{getClassDisplayName(lesson.schedule.classId, lesson.schedule.className)}</strong>
                  <span>
                    {formatTime(lesson.startTime)}–{formatTime(lesson.endTime)}
                  </span>
                  <small>
                    Grundschema: {lesson.schedule.validFrom} – {lesson.schedule.validUntil}
                  </small>
                  <div className={styles.lessonFooter}>
                    {lesson.overrideType && (
                      <small
                        className={lesson.overrideType === "CANCEL" ? styles.cancelBadge : styles.overrideBadge}>
                        {getOverrideLabel(lesson.overrideType)}
                      </small>
                    )}
                    {canManageSchedule && (
                      <button
                        type="button"
                        className={styles.quickChangeIconButton}
                        title="Tillfällig ändring"
                        onClick={() => onQuickChange(lesson.schedule, date)}
                        aria-label={`Gör en tillfällig ändring för ${getClassDisplayName(lesson.schedule.classId, lesson.schedule.className)}`}>
                        <Pencil size={14} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </article>
              ))
            )}
          </section>
        )
      })}
    </div>
  )
}

export default ScheduleDayView
