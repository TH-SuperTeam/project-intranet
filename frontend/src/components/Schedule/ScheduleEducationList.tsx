import { Pencil, Trash2 } from "lucide-react"
import type { WeeklySchedule } from "../../types/WeeklySchedule"
import styles from "../../pages/SchedulePage.module.css"
import type { EducationScheduleGroup } from "../../types/ScheduleView"
import { formatTime, shortWeekdays } from "../../utils/schedule/scheduleUtils"

type Props = {
  groups: EducationScheduleGroup[]
  canManageSchedule: boolean
  getClassDisplayName: (classId: number, className: string) => string
  getClassSchool: (classId: number) => string | undefined
  onEdit: (schedule: WeeklySchedule) => void
  onDelete: (schedule: WeeklySchedule) => void
}

const ScheduleEducationList = ({
  groups,
  canManageSchedule,
  getClassDisplayName,
  getClassSchool,
  onEdit,
  onDelete,
}: Props) => (
  <div className={styles.educationList}>
    {groups.map(({ program, classes }) => (
      <details className={styles.educationAccordion} key={program.id}>
        <summary>{program.name}</summary>
        <div className={styles.educationClasses}>
          {classes.map(({ schoolClass, schedules }) => (
            <section className={styles.classScheduleGroup} key={schoolClass.id}>
              <h3>{schoolClass.name}</h3>
              <ul className={styles.list}>
                {schedules.map((lesson) => (
                  <li key={lesson.id} data-school={getClassSchool(lesson.classId)}>
                    <strong>{shortWeekdays[lesson.weekday - 1]}</strong>
                    <div className={styles.lessonDetails}>
                      <b>{getClassDisplayName(lesson.classId, lesson.className)}</b>
                      <span>{lesson.classroomName}</span>
                      <span>
                        {formatTime(lesson.startTime)}–{formatTime(lesson.endTime)}
                      </span>
                      <small>
                        Gäller {lesson.validFrom} – {lesson.validUntil}
                      </small>
                    </div>
                    {canManageSchedule && (
                      <div className={styles.listActions}>
                        <button
                          type="button"
                          className={styles.editIconButton}
                          aria-label={`Redigera lektion för ${lesson.className}`}
                          title="Redigera lektion"
                          onClick={() => onEdit(lesson)}>
                          <Pencil size={19} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className={styles.deleteIconButton}
                          aria-label={`Ta bort lektion för ${lesson.className}`}
                          title="Ta bort lektion"
                          onClick={() => onDelete(lesson)}>
                          <Trash2 size={19} aria-hidden="true" />
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </details>
    ))}
  </div>
)

export default ScheduleEducationList
