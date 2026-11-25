import { useState, type FormEvent } from "react"
import type { Classroom } from "../../types/Classroom"
import type { ScheduleOverride, ScheduleOverrideInput, OverrideType } from "../../types/ScheduleOverride"
import type { WeeklySchedule } from "../../types/WeeklySchedule"
import styles from "./ScheduleOverrideForm.module.css"

type Props = {
  schedules: WeeklySchedule[]
  classrooms: Classroom[]
  getClassDisplayName: (classId: number, className: string) => string
  scheduleOverride?: ScheduleOverride
  isPending: boolean
  error: string | null
  onSubmit: (override: ScheduleOverrideInput) => void
  onCancel: () => void
}

const weekdays = ["", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"]

const ScheduleOverrideForm = ({
  schedules,
  classrooms,
  getClassDisplayName,
  scheduleOverride,
  isPending,
  error,
  onSubmit,
  onCancel,
}: Props) => {
  const [weeklyScheduleId, setWeeklyScheduleId] = useState(String(scheduleOverride?.weeklyScheduleId ?? ""))
  const [overrideType, setOverrideType] = useState<OverrideType>(scheduleOverride?.overrideType ?? "CANCEL")
  const [classroomId, setClassroomId] = useState(String(scheduleOverride?.classroomId ?? ""))
  const [startTime, setStartTime] = useState(scheduleOverride?.startTime?.slice(0, 5) ?? "")
  const [endTime, setEndTime] = useState(scheduleOverride?.endTime?.slice(0, 5) ?? "")
  const [validFrom, setValidFrom] = useState(scheduleOverride?.validFrom ?? "")
  const [validUntil, setValidUntil] = useState(scheduleOverride?.validUntil ?? "")
  const [note, setNote] = useState(scheduleOverride?.note ?? "")
  const [validationError, setValidationError] = useState("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setValidationError("")

    if (validUntil < validFrom) {
      setValidationError("Slutdatumet måste vara samma som eller senare än startdatumet.")
      return
    }

    if (Boolean(startTime) !== Boolean(endTime)) {
      setValidationError("Ange både starttid och sluttid.")
      return
    }

    if (overrideType === "MODIFY" && !classroomId && !startTime) {
      setValidationError("Ange ett nytt klassrum eller nya tider.")
      return
    }

    if (overrideType === "ADD_ROOM" && !classroomId) {
      setValidationError("Välj ett extra klassrum.")
      return
    }

    onSubmit({
      weeklyScheduleId: Number(weeklyScheduleId),
      overrideType,
      classroomId: overrideType === "CANCEL" || !classroomId ? null : Number(classroomId),
      startTime: overrideType === "CANCEL" || !startTime ? null : startTime,
      endTime: overrideType === "CANCEL" || !endTime ? null : endTime,
      validFrom,
      validUntil,
      note: note.trim() || null,
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{scheduleOverride ? "Redigera tillfällig schemaändring" : "Ny tillfällig schemaändring"}</h2>

      <label>
        Schemalagd lektion
        <select required value={weeklyScheduleId} onChange={(event) => setWeeklyScheduleId(event.target.value)}>
          <option value="">Välj lektion</option>
          {schedules.map((schedule) => (
            <option key={schedule.id} value={schedule.id}>
              {getClassDisplayName(schedule.classId, schedule.className)} – {schedule.classroomName}, {weekdays[schedule.weekday]}{" "}
              {schedule.startTime.slice(0, 5)}–{schedule.endTime.slice(0, 5)}
            </option>
          ))}
        </select>
      </label>

      <label>
        Typ av ändring
        <select
          value={overrideType}
          onChange={(event) => {
            setOverrideType(event.target.value as OverrideType)
            setClassroomId("")
            setStartTime("")
            setEndTime("")
          }}>
          <option value="CANCEL">Inställd lektion</option>
          <option value="MODIFY">Ändrad lektion</option>
          <option value="ADD_ROOM">Lägg till klassrum</option>
        </select>
      </label>

      {overrideType !== "CANCEL" && (
        <label>
          {overrideType === "ADD_ROOM" ? "Extra klassrum" : "Nytt klassrum"}
          <select
            required={overrideType === "ADD_ROOM"}
            value={classroomId}
            onChange={(event) => setClassroomId(event.target.value)}>
            <option value="">{overrideType === "ADD_ROOM" ? "Välj extra klassrum" : "Behåll nuvarande"}</option>
            {classrooms.map((classroom) => (
              <option key={classroom.id} value={classroom.id}>
                {classroom.name}
              </option>
            ))}
          </select>
        </label>
      )}

      {overrideType !== "CANCEL" && (
        <>
          <label>
            Ny starttid (valfritt)
            <input type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} />
          </label>

          <label>
            Ny sluttid (valfritt)
            <input type="time" value={endTime} onChange={(event) => setEndTime(event.target.value)} />
          </label>
        </>
      )}

      <label>
        Gäller från
        <input required type="date" value={validFrom} onChange={(event) => setValidFrom(event.target.value)} />
      </label>

      <label>
        Gäller till
        <input required type="date" value={validUntil} onChange={(event) => setValidUntil(event.target.value)} />
      </label>

      <label className={styles.note}>
        Meddelande (valfritt)
        <textarea value={note} onChange={(event) => setNote(event.target.value)} />
      </label>

      {(validationError || error) && (
        <p className={styles.error} role="alert">
          {validationError || error}
        </p>
      )}

      <div className={styles.actions}>
        <button type="button" onClick={onCancel} disabled={isPending}>
          Avbryt
        </button>
        <button type="submit" disabled={isPending}>
          {isPending ? "Sparar…" : scheduleOverride ? "Spara ändringar" : "Spara ändring"}
        </button>
      </div>
    </form>
  )
}

export default ScheduleOverrideForm
