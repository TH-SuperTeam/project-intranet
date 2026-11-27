import { Pencil } from "lucide-react"
import type { Classroom } from "../../types/Classroom"
import type { WeeklySchedule } from "../../types/WeeklySchedule"
import styles from "../../pages/SchedulePage.module.css"
import type { DisplayLesson } from "../../types/ScheduleView"
import { formatDate, formatTime, getDateKey, getOverrideLabel } from "../../utils/schedule/scheduleUtils"

type Props = {
  rooms: Classroom[]
  weekDates: Date[]
  canManageSchedule: boolean
  getClassDisplayName: (classId: number, className: string) => string
  getClassSchool: (classId: number) => string | undefined
  getLessonsForDate: (date: Date) => DisplayLesson[]
  onQuickChange: (schedule: WeeklySchedule, date: Date) => void
}

const ScheduleWeekView = ({
  rooms,
  weekDates,
  canManageSchedule,
  getClassDisplayName,
  getClassSchool,
  getLessonsForDate,
  onQuickChange,
}: Props) => (
  <div className={styles.weekGrid}>
    <div />
    {weekDates.map((weekDate) => (
      <strong className={styles.weekday} key={getDateKey(weekDate)}>
        {formatDate(weekDate, { weekday: "short", day: "numeric" })}
      </strong>
    ))}
    {rooms.map((room) => (
      <div className={styles.weekRow} key={room.id}>
        <strong className={styles.roomName}>{room.name}</strong>
        {weekDates.map((weekDate) => {
          const lessons = getLessonsForDate(weekDate).filter((lesson) => lesson.classroomId === room.id)

          return (
            <div className={styles.weekCell} key={getDateKey(weekDate)}>
              {lessons.length === 0 ? (
                <span className={styles.available}>Ledigt</span>
              ) : (
                lessons.map((lesson) => (
                  <article
                    className={styles.lesson}
                    data-school={getClassSchool(lesson.schedule.classId)}
                    key={`${lesson.schedule.id}-${lesson.classroomId}`}>
                    <strong>{getClassDisplayName(lesson.schedule.classId, lesson.schedule.className)}</strong>
                    <span>
                      {formatTime(lesson.startTime)}–{formatTime(lesson.endTime)}
                    </span>
                    <div className={styles.lessonFooter}>
                      {lesson.overrideType && (
                        <small className={lesson.overrideType === "CANCEL" ? styles.cancelBadge : styles.overrideBadge}>
                          {getOverrideLabel(lesson.overrideType)}
                        </small>
                      )}
                      {canManageSchedule && (
                        <button
                          type="button"
                          className={styles.quickChangeIconButton}
                          title="Tillfällig ändring"
                          onClick={() => onQuickChange(lesson.schedule, weekDate)}
                          aria-label={`Gör en tillfällig ändring för ${getClassDisplayName(lesson.schedule.classId, lesson.schedule.className)}`}>
                          <Pencil size={14} aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </article>
                ))
              )}
            </div>
          )
        })}
      </div>
    ))}
  </div>
)

export default ScheduleWeekView
