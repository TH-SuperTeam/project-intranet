import { useState, type FormEvent } from "react"
import type { Classroom } from "../../types/Classroom"
import type { SchoolClass } from "../../types/SchoolClass"
import type { WeeklySchedule, WeeklyScheduleInput } from "../../types/WeeklySchedule"
import styles from "./ScheduleForm.module.css"

type ScheduleFormProps = {
  classes: SchoolClass[]
  classrooms: Classroom[]
  getClassDisplayName: (classId: number, className: string) => string
  isPending: boolean
  error: string | null
  onSubmit: (schedule: WeeklyScheduleInput) => void
  onCancel: () => void
  schedule?: WeeklySchedule
}

const ScheduleForm = ({
  classes,
  classrooms,
  getClassDisplayName,
  isPending,
  error,
  onSubmit,
  onCancel,
  schedule,
}: ScheduleFormProps) => {
  const [classId, setClassId] = useState(String(schedule?.classId ?? ""))
  const [classroomId, setClassroomId] = useState(String(schedule?.classroomId ?? ""))
  const [weekday, setWeekday] = useState(String(schedule?.weekday ?? 1))
  const [startTime, setStartTime] = useState(schedule?.startTime.slice(0, 5) ?? "")
  const [endTime, setEndTime] = useState(schedule?.endTime.slice(0, 5) ?? "")
  const [validFrom, setValidFrom] = useState(schedule?.validFrom ?? "")
  const [validUntil, setValidUntil] = useState(schedule?.validUntil ?? "")
  const [validationError, setValidationError] = useState("")

  const submitLabel = schedule ? "Spara ändringar" : "Spara lektion"

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setValidationError("")

    if (endTime <= startTime) {
      setValidationError("Sluttiden måste vara efter starttiden.")
      return
    }

    if (validUntil < validFrom) {
      setValidationError("Slutdatumet måste vara samma som eller senare än startdatumet.")
      return
    }

    onSubmit({
      classId: Number(classId),
      classroomId: Number(classroomId),
      weekday: Number(weekday),
      startTime,
      endTime,
      validFrom,
      validUntil,
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{schedule ? "Redigera lektion" : "Ny lektion"}</h2>

      <label>
        Klass
        <select required value={classId} onChange={(event) => setClassId(event.target.value)}>
          <option value="">Välj klass</option>
          {classes.map((schoolClass) => (
            <option key={schoolClass.id} value={schoolClass.id}>
              {getClassDisplayName(schoolClass.id, schoolClass.name)}
            </option>
          ))}
        </select>
      </label>

      <label>
        Klassrum
        <select required value={classroomId} onChange={(event) => setClassroomId(event.target.value)}>
          <option value="">Välj klassrum</option>
          {classrooms.map((classroom) => (
            <option key={classroom.id} value={classroom.id}>
              {classroom.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Veckodag
        <select value={weekday} onChange={(event) => setWeekday(event.target.value)}>
          <option value="1">Måndag</option>
          <option value="2">Tisdag</option>
          <option value="3">Onsdag</option>
          <option value="4">Torsdag</option>
          <option value="5">Fredag</option>
          <option value="6">Lördag</option>
          <option value="7">Söndag</option>
        </select>
      </label>

      <label>
        Starttid
        <input required type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} />
      </label>

      <label>
        Sluttid
        <input required type="time" value={endTime} onChange={(event) => setEndTime(event.target.value)} />
      </label>

      <label>
        Gäller från
        <input required type="date" value={validFrom} onChange={(event) => setValidFrom(event.target.value)} />
      </label>

      <label>
        Gäller till
        <input required type="date" value={validUntil} onChange={(event) => setValidUntil(event.target.value)} />
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
          {isPending ? "Sparar…" : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default ScheduleForm
