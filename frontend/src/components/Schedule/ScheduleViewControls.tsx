import type { RefObject } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Classroom } from "../../types/Classroom"
import type { SchoolClass } from "../../types/SchoolClass"
import styles from "../../pages/SchedulePage.module.css"
import type { ScheduleView } from "../../types/ScheduleView"
import { getDateKey } from "../../utils/schedule/scheduleUtils"

type Props = {
  view: ScheduleView
  onViewChange: (view: ScheduleView) => void
  classes: SchoolClass[]
  classrooms: Classroom[]
  classId?: number
  classroomId?: number
  onClassChange: (id: number | undefined) => void
  onClassroomChange: (id: number | undefined) => void
  getClassDisplayName: (classId: number, className: string) => string
  date: Date
  dateTitle: string
  datePickerRef: RefObject<HTMLInputElement | null>
  onOpenDatePicker: () => void
  onMoveDate: (direction: number) => void
  onSelectDate: (date: Date) => void
  onToday: () => void
}

const ScheduleViewControls = ({
  view,
  onViewChange,
  classes,
  classrooms,
  classId,
  classroomId,
  onClassChange,
  onClassroomChange,
  getClassDisplayName,
  date,
  dateTitle,
  datePickerRef,
  onOpenDatePicker,
  onMoveDate,
  onSelectDate,
  onToday,
}: Props) => (
  <>
    <div className={styles.controls}>
      <div className={styles.tabs} aria-label="Schemavy">
        <button className={view === "day" ? styles.activeTab : ""} onClick={() => onViewChange("day")}>
          Dag
        </button>
        <button className={view === "week" ? styles.activeTab : ""} onClick={() => onViewChange("week")}>
          Vecka
        </button>
        <button className={view === "list" ? styles.activeTab : ""} onClick={() => onViewChange("list")}>
          Lista
        </button>
      </div>

      <div className={styles.filters}>
        <label>
          <span>Klass</span>
          <select value={classId ?? ""} onChange={(event) => onClassChange(event.target.value ? Number(event.target.value) : undefined)}>
            <option value="">Alla klasser</option>
            {classes.map((schoolClass) => (
              <option key={schoolClass.id} value={schoolClass.id}>
                {getClassDisplayName(schoolClass.id, schoolClass.name)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Klassrum</span>
          <select
            value={classroomId ?? ""}
            onChange={(event) => onClassroomChange(event.target.value ? Number(event.target.value) : undefined)}>
            <option value="">Alla klassrum</option>
            {classrooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>

    {view !== "list" && (
      <div className={styles.dateNavigation}>
        <button type="button" onClick={() => onMoveDate(-1)} aria-label="Föregående">
          <ChevronLeft />
        </button>
        <div className={styles.datePicker}>
          <button
            type="button"
            className={styles.datePickerButton}
            aria-label={view === "week" ? "Välj datum för veckan" : "Välj dag"}
            onClick={onOpenDatePicker}>
            {dateTitle}
          </button>
          <input
            ref={datePickerRef}
            className={styles.datePickerInput}
            type="date"
            value={getDateKey(date)}
            aria-label={view === "week" ? "Välj datum för veckan" : "Välj dag"}
            tabIndex={-1}
            onChange={(event) => {
              if (event.target.value) onSelectDate(new Date(`${event.target.value}T12:00:00`))
            }}
          />
        </div>
        <button type="button" onClick={() => onMoveDate(1)} aria-label="Nästa">
          <ChevronRight />
        </button>
        <button type="button" onClick={onToday}>
          Idag
        </button>
      </div>
    )}
  </>
)

export default ScheduleViewControls
