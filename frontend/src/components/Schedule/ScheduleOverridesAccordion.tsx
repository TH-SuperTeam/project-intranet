import { Pencil, Trash2 } from "lucide-react"
import type { ScheduleOverride } from "../../types/ScheduleOverride"
import type { WeeklySchedule } from "../../types/WeeklySchedule"
import styles from "../../pages/SchedulePage.module.css"
import { formatTime, getOverrideLabel } from "../../utils/schedule/scheduleUtils"

type Props = {
  overrides: ScheduleOverride[]
  schedules: WeeklySchedule[]
  showExpired: boolean
  canManageSchedule: boolean
  getClassDisplayName: (classId: number, className: string) => string
  getClassSchool: (classId: number) => string | undefined
  onShowExpiredChange: (show: boolean) => void
  onEdit: (override: ScheduleOverride) => void
  onDelete: (override: ScheduleOverride) => void
}

const ScheduleOverridesAccordion = ({
  overrides,
  schedules,
  showExpired,
  canManageSchedule,
  getClassDisplayName,
  getClassSchool,
  onShowExpiredChange,
  onEdit,
  onDelete,
}: Props) => (
  <details className={styles.overrideSection}>
    <summary>Tillfälliga schemaändringar</summary>
    <div className={styles.overrideSectionContent}>
      <div className={styles.overrideListToolbar}>
        <label className={styles.expiredOverridesToggle}>
          <input type="checkbox" checked={showExpired} onChange={(event) => onShowExpiredChange(event.target.checked)} />
          Visa utgångna avvikelser
        </label>
      </div>
      {overrides.length === 0 ? (
        <p className={styles.empty}>
          {showExpired
            ? "Det finns inga tillfälliga schemaändringar."
            : "Inga aktiva eller kommande avvikelser. Markera rutan för att visa utgångna."}
        </p>
      ) : (
        <ul className={styles.overrideList}>
          {overrides.map((override) => {
            const baseSchedule = schedules.find((schedule) => schedule.id === override.weeklyScheduleId)
            const roomName = override.classroomName ?? baseSchedule?.classroomName

            return (
              <li key={override.id} data-school={getClassSchool(override.classId)}>
                <div className={styles.overrideDetails}>
                  <strong>{getClassDisplayName(override.classId, override.className)}</strong>
                  <span>{getOverrideLabel(override.overrideType)}</span>
                  {roomName && <span>Klassrum: {roomName}</span>}
                  {(override.startTime || override.endTime) && (
                    <span>
                      Tid: {override.startTime ? formatTime(override.startTime) : "ordinarie start"}–
                      {override.endTime ? formatTime(override.endTime) : "ordinarie slut"}
                    </span>
                  )}
                  <small>
                    Gäller {override.validFrom} – {override.validUntil}
                  </small>
                  {override.note && <small>{override.note}</small>}
                </div>
                {canManageSchedule && (
                  <div className={styles.overrideActions}>
                    <button
                      type="button"
                      className={styles.editIconButton}
                      aria-label={`Redigera tillfällig ändring för ${override.className}`}
                      title="Redigera tillfällig ändring"
                      onClick={() => onEdit(override)}>
                      <Pencil size={19} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className={styles.deleteIconButton}
                      aria-label={`Ta bort tillfällig ändring för ${override.className}`}
                      title="Ta bort tillfällig ändring"
                      onClick={() => onDelete(override)}>
                      <Trash2 size={19} aria-hidden="true" />
                    </button>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  </details>
)

export default ScheduleOverridesAccordion
