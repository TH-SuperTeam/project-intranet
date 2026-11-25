import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Trash2, Pencil } from "lucide-react"
import { useScheduleOptions } from "../hooks/ScheduleHooks/useScheduleOptions"
import {
  useWeeklySchedules,
  useUpdateWeeklySchedule,
  useCreateWeeklySchedule,
  useDeleteWeeklySchedule,
  useCreateScheduleOverride,
  useUpdateScheduleOverride,
  useDeleteScheduleOverride,
  useScheduleOverrides,
} from "../hooks/ScheduleHooks/useSchedule"
import ScheduleSkeleton from "../components/Loaders/Skeletons/ScheduleSkeleton"
import styles from "./SchedulePage.module.css"
import ScheduleForm from "../components/Schedule/ScheduleForm"
import ScheduleOverrideForm from "../components/Schedule/ScheduleOverrideForm"
import ConfirmDialog from "../components/common/ConfirmDialog"

import { useAuth } from "../hooks/useAuth"
import { UserType } from "../types/UserType"
import { AccessRole } from "../types/AccessRole"
import type { WeeklyScheduleInput, WeeklySchedule } from "../types/WeeklySchedule"
import type { ScheduleOverride, ScheduleOverrideInput } from "../types/ScheduleOverride"

type View = "day" | "week" | "list"

const weekdays = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"]
const shortWeekdays = ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"]

const formatTime = (time: string) => time.slice(0, 5)

const formatDate = (date: Date, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("sv-SE", options).format(date)

const getDateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const getWeekday = (date: Date) => ((date.getDay() + 6) % 7) + 1

const addDays = (date: Date, days: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

const isActiveOnDate = (schedule: { validFrom: string; validUntil: string }, date: Date) => {
  const dateKey = getDateKey(date)
  return schedule.validFrom <= dateKey && schedule.validUntil >= dateKey
}

type DisplayLesson = {
  schedule: WeeklySchedule
  classroomId: number
  classroomName: string
  startTime: string
  endTime: string
  overrideType?: ScheduleOverride["overrideType"]
}

const getOverrideLabel = (type: ScheduleOverride["overrideType"]) => {
  if (type === "CANCEL") return "Inställd"
  if (type === "MODIFY") return "Tillfälligt ändrad"
  return "Extra klassrum"
}

const SchedulePage = () => {
  const formRef = useRef<HTMLDivElement>(null)
  const datePickerRef = useRef<HTMLInputElement>(null)
  const [view, setView] = useState<View>("day")
  const [date, setDate] = useState(() => new Date())
  const [classId, setClassId] = useState<number | undefined>()
  const [classroomId, setClassroomId] = useState<number | undefined>()
  const [successMessage, setSuccessMessage] = useState("")

  const { user } = useAuth()

  const canManageSchedule = user?.userType === UserType.TEACHER || user?.accessRole === AccessRole.ADMIN

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showOverrideForm, setShowOverrideForm] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState<WeeklySchedule | null>(null)
  const [scheduleToDelete, setScheduleToDelete] = useState<WeeklySchedule | null>(null)
  const [editingOverride, setEditingOverride] = useState<ScheduleOverride | null>(null)
  const [overrideToDelete, setOverrideToDelete] = useState<ScheduleOverride | null>(null)

  useEffect(() => {
    const formIsOpen = showCreateForm || editingSchedule || showOverrideForm || editingOverride

    if (formIsOpen) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [showCreateForm, editingSchedule, showOverrideForm, editingOverride])

  const createSchedule = useCreateWeeklySchedule()
  const updateSchedule = useUpdateWeeklySchedule()
  const deleteSchedule = useDeleteWeeklySchedule()
  const createOverride = useCreateScheduleOverride()
  const updateOverride = useUpdateScheduleOverride()
  const deleteOverride = useDeleteScheduleOverride()
  const overrideMutation = editingOverride ? updateOverride : createOverride
  const formMutation = editingSchedule ? updateSchedule : createSchedule

  const handleSaveSchedule = (schedule: WeeklyScheduleInput) => {
    const wasEditing = editingSchedule !== null

    const onSuccess = () => {
      setShowCreateForm(false)
      setEditingSchedule(null)
      setSuccessMessage(wasEditing ? "Lektionen har uppdaterats." : "Lektionen har sparats.")
    }

    if (editingSchedule) {
      updateSchedule.mutate({ id: editingSchedule.id, schedule }, { onSuccess })
    } else {
      createSchedule.mutate(schedule, { onSuccess })
    }
  }

  const handleDeleteSchedule = () => {
    if (!scheduleToDelete) return

    deleteSchedule.mutate(scheduleToDelete.id, {
      onSuccess: () => {
        setScheduleToDelete(null)
        setSuccessMessage("Lektionen har tagits bort.")
      },
    })
  }

  const handleSaveOverride = (override: ScheduleOverrideInput) => {
    const onSuccess = () => {
      setShowOverrideForm(false)
      setEditingOverride(null)
      setSuccessMessage(
        editingOverride ? "Den tillfälliga ändringen har uppdaterats." : "Den tillfälliga ändringen har sparats.",
      )
    }

    if (editingOverride) {
      updateOverride.mutate({ id: editingOverride.id, override }, { onSuccess })
    } else {
      createOverride.mutate(override, { onSuccess })
    }
  }

  const handleDeleteOverride = () => {
    if (!overrideToDelete) return

    deleteOverride.mutate(overrideToDelete.id, {
      onSuccess: () => {
        setOverrideToDelete(null)
        setSuccessMessage("Den tillfälliga ändringen har tagits bort.")
      },
    })
  }

  const cancelOverrideForm = () => {
    createOverride.reset()
    updateOverride.reset()
    setEditingOverride(null)
    setShowOverrideForm(false)
  }

  const options = useScheduleOptions(canManageSchedule)
  const schedulesQuery = useWeeklySchedules({ classId, classroomId })
  const allSchedulesQuery = useWeeklySchedules()
  const overridesQuery = useScheduleOverrides()
  const schedules = schedulesQuery.data ?? []
  const overrides = overridesQuery.data ?? []
  const visibleOverrides = overrides.filter((override) => {
    const baseSchedule = allSchedulesQuery.data?.find((schedule) => schedule.id === override.weeklyScheduleId)
    const effectiveClassroomId = override.classroomId ?? baseSchedule?.classroomId

    return (
      (classId === undefined || override.classId === classId) &&
      (classroomId === undefined || effectiveClassroomId === classroomId)
    )
  })
  const error = options.error ?? schedulesQuery.error ?? allSchedulesQuery.error ?? overridesQuery.error
  const isLoading =
    options.isLoading || schedulesQuery.isLoading || allSchedulesQuery.isLoading || overridesQuery.isLoading

  const getClassDisplayName = (classId: number, className: string) => {
    const schoolClass = options.allClasses.find((item) => item.id === classId)
    const program = options.programs.find((item) => item.id === schoolClass?.programId)

    return program ? `${program.name} ${className}` : className
  }

  const getClassSchool = (classId: number) => {
    const schoolClass = options.allClasses.find((item) => item.id === classId)
    return options.programs.find((item) => item.id === schoolClass?.programId)?.school
  }

  const monday = addDays(date, -((date.getDay() + 6) % 7))
  const weekDates = Array.from({ length: 5 }, (_, index) => addDays(monday, index))
  const rooms = options.classrooms.filter((room) => classroomId === undefined || room.id === classroomId)

  const getLessonsForDate = (lessonDate: Date): DisplayLesson[] => {
    const dateKey = getDateKey(lessonDate)
    const baseSchedules = (allSchedulesQuery.data ?? []).filter(
      (schedule) =>
        schedule.weekday === getWeekday(lessonDate) &&
        isActiveOnDate(schedule, lessonDate) &&
        (classId === undefined || schedule.classId === classId),
    )

    return baseSchedules.flatMap((schedule) => {
      const override = overrides.find(
        (item) => item.weeklyScheduleId === schedule.id && item.validFrom <= dateKey && item.validUntil >= dateKey,
      )

      const baseClassroom = options.classrooms.find((room) => room.id === schedule.classroomId)
      const effectiveClassroomId =
        override?.overrideType === "MODIFY" && override.classroomId ? override.classroomId : schedule.classroomId
      const effectiveClassroom = options.classrooms.find((room) => room.id === effectiveClassroomId)
      const effectiveLesson: DisplayLesson = {
        schedule,
        classroomId: effectiveClassroomId,
        classroomName:
          override?.overrideType === "MODIFY" && override.classroomName
            ? override.classroomName
            : (effectiveClassroom?.name ?? baseClassroom?.name ?? schedule.classroomName),
        startTime: override?.overrideType === "MODIFY" && override.startTime ? override.startTime : schedule.startTime,
        endTime: override?.overrideType === "MODIFY" && override.endTime ? override.endTime : schedule.endTime,
        overrideType: override?.overrideType === "ADD_ROOM" ? undefined : override?.overrideType,
      }

      const lessons = [effectiveLesson]
      if (override?.overrideType === "ADD_ROOM" && override.classroomId) {
        const extraRoom = options.classrooms.find((room) => room.id === override.classroomId)
        lessons.push({
          ...effectiveLesson,
          classroomId: override.classroomId,
          classroomName: override.classroomName ?? extraRoom?.name ?? "Extra klassrum",
          startTime: override.startTime ?? schedule.startTime,
          endTime: override.endTime ?? schedule.endTime,
          overrideType: "ADD_ROOM",
        })
      }

      return lessons.filter((lesson) => classroomId === undefined || lesson.classroomId === classroomId)
    })
  }

  const dayLessons = getLessonsForDate(date)

  const moveDate = (direction: number) => {
    setDate((currentDate) => addDays(currentDate, direction * (view === "week" ? 7 : 1)))
  }

  const dateTitle =
    view === "week"
      ? `${formatDate(weekDates[0], { day: "numeric", month: "short" })} – ${formatDate(weekDates[4], { day: "numeric", month: "short", year: "numeric" })}`
      : formatDate(date, { weekday: "long", day: "numeric", month: "long", year: "numeric" })

  const openDatePicker = () => {
    const input = datePickerRef.current as (HTMLInputElement & { showPicker?: () => void }) | null

    if (!input) return
    if (typeof input.showPicker === "function") input.showPicker()
    else input.click()
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Schema</h1>
          <p>Se och hantera lektioner och klassrum.</p>
        </div>

        {canManageSchedule && (
          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.createButton}
              aria-expanded={showCreateForm}
              onClick={() => {
                createSchedule.reset()
                updateSchedule.reset()
                createOverride.reset()
                updateOverride.reset()
                setShowOverrideForm(false)
                setEditingOverride(null)
                setEditingSchedule(null)
                setShowCreateForm((isOpen) => !isOpen)
              }}>
              <Plus size={18} />
              {showCreateForm ? "Stäng" : "Ny lektion"}
            </button>
            <button
              type="button"
              className={styles.createButton}
              aria-expanded={showOverrideForm}
              onClick={() => {
                createOverride.reset()
                updateOverride.reset()
                setShowCreateForm(false)
                setEditingSchedule(null)
                setEditingOverride(null)
                setShowOverrideForm((isOpen) => !isOpen)
              }}>
              Tillfällig ändring
            </button>
          </div>
        )}
      </header>

      <section className={styles.panel} aria-label="Schemalagda lektioner">
        {isLoading ? (
          <ScheduleSkeleton />
        ) : error ? (
          <p className={styles.error} role="alert">
            {error instanceof Error ? error.message : "Schemat kunde inte hämtas."}
          </p>
        ) : (
          <>
            {successMessage && (
              <p className={styles.success} role="status">
                {successMessage}
              </p>
            )}
            <div ref={formRef} className={styles.formSection}>
              {(showCreateForm || editingSchedule) && canManageSchedule && (
                <ScheduleForm
                  key={editingSchedule?.id ?? "new"}
                  classes={options.classes}
                  classrooms={options.classrooms}
                  getClassDisplayName={getClassDisplayName}
                  schedule={editingSchedule ?? undefined}
                  isPending={formMutation.isPending}
                  error={formMutation.error instanceof Error ? formMutation.error.message : null}
                  onSubmit={handleSaveSchedule}
                  onCancel={() => {
                    createSchedule.reset()
                    updateSchedule.reset()
                    setEditingSchedule(null)
                    setShowCreateForm(false)
                  }}
                />
              )}
              {(showOverrideForm || editingOverride) && canManageSchedule && (
                <ScheduleOverrideForm
                  key={editingOverride?.id ?? "new-override"}
                  schedules={allSchedulesQuery.data ?? []}
                  classrooms={options.classrooms}
                  getClassDisplayName={getClassDisplayName}
                  scheduleOverride={editingOverride ?? undefined}
                  isPending={overrideMutation.isPending}
                  error={overrideMutation.error instanceof Error ? overrideMutation.error.message : null}
                  onSubmit={handleSaveOverride}
                  onCancel={cancelOverrideForm}
                />
              )}
            </div>
            <div className={styles.controls}>
              <div className={styles.tabs} aria-label="Schemavy">
                <button className={view === "day" ? styles.activeTab : ""} onClick={() => setView("day")}>
                  Dag
                </button>
                <button className={view === "week" ? styles.activeTab : ""} onClick={() => setView("week")}>
                  Vecka
                </button>
                <button className={view === "list" ? styles.activeTab : ""} onClick={() => setView("list")}>
                  Lista
                </button>
              </div>

              <div className={styles.filters}>
                <label>
                  <span>Klass</span>
                  <select
                    value={classId ?? ""}
                    onChange={(event) => setClassId(event.target.value ? Number(event.target.value) : undefined)}>
                    <option value="">Alla klasser</option>
                    {options.classes.map((schoolClass) => (
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
                    onChange={(event) => setClassroomId(event.target.value ? Number(event.target.value) : undefined)}>
                    <option value="">Alla klassrum</option>
                    {options.classrooms.map((room) => (
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
                <button type="button" onClick={() => moveDate(-1)} aria-label="Föregående">
                  <ChevronLeft />
                </button>
                <div className={styles.datePicker}>
                  <button
                    type="button"
                    className={styles.datePickerButton}
                    aria-label={view === "week" ? "Välj datum för veckan" : "Välj dag"}
                    onClick={openDatePicker}>
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
                      if (event.target.value) setDate(new Date(`${event.target.value}T12:00:00`))
                    }}
                  />
                </div>
                <button type="button" onClick={() => moveDate(1)} aria-label="Nästa">
                  <ChevronRight />
                </button>
                <button type="button" onClick={() => setDate(new Date())}>
                  Idag
                </button>
              </div>
            )}

            {view === "day" &&
              (rooms.length === 0 ? (
                <p className={styles.empty}>Inga klassrum hittades.</p>
              ) : (
                <div className={styles.dayGrid}>
                  {rooms.map((room) => {
                    const lessons = dayLessons.filter((lesson) => lesson.classroomId === room.id)
                    return (
                      <section className={styles.room} key={room.id}>
                        <h3>{room.name}</h3>
                        {lessons.length === 0 ? (
                          <p className={styles.available}>Ledigt</p>
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
                              <small>
                                Grundschema: {lesson.schedule.validFrom} – {lesson.schedule.validUntil}
                              </small>
                              {lesson.overrideType && (
                                <small
                                  className={
                                    lesson.overrideType === "CANCEL" ? styles.cancelBadge : styles.overrideBadge
                                  }>
                                  {getOverrideLabel(lesson.overrideType)}
                                </small>
                              )}
                            </article>
                          ))
                        )}
                      </section>
                    )
                  })}
                </div>
              ))}

            {view === "week" && (
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
                                {lesson.overrideType && (
                                  <small
                                    className={
                                      lesson.overrideType === "CANCEL" ? styles.cancelBadge : styles.overrideBadge
                                    }>
                                    {getOverrideLabel(lesson.overrideType)}
                                  </small>
                                )}
                              </article>
                            ))
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            )}

            {view === "list" &&
              (schedules.length === 0 ? (
                <p className={styles.empty}>Det finns inga schemalagda lektioner.</p>
              ) : (
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
                            onClick={() => {
                              createSchedule.reset()
                              updateSchedule.reset()
                              createOverride.reset()
                              updateOverride.reset()
                              setSuccessMessage("")
                              setShowCreateForm(false)
                              setShowOverrideForm(false)
                              setEditingOverride(null)
                              setEditingSchedule(lesson)
                            }}>
                            <Pencil size={19} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            className={styles.deleteIconButton}
                            aria-label={`Ta bort lektion för ${lesson.className}`}
                            title="Ta bort lektion"
                            onClick={() => setScheduleToDelete(lesson)}>
                            <Trash2 size={19} aria-hidden="true" />
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ))}

            {view === "list" && (
              <section className={styles.overrideSection} aria-label="Tillfälliga schemaändringar">
                <h2>Tillfälliga schemaändringar</h2>
                {visibleOverrides.length === 0 ? (
                  <p className={styles.empty}>Det finns inga tillfälliga schemaändringar.</p>
                ) : (
                  <ul className={styles.overrideList}>
                    {visibleOverrides.map((override) => {
                      const baseSchedule = allSchedulesQuery.data?.find(
                        (schedule) => schedule.id === override.weeklyScheduleId,
                      )
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
                                onClick={() => {
                                  createOverride.reset()
                                  updateOverride.reset()
                                  setSuccessMessage("")
                                  setShowOverrideForm(false)
                                  setShowCreateForm(false)
                                  setEditingSchedule(null)
                                  setEditingOverride(override)
                                }}>
                                <Pencil size={19} aria-hidden="true" />
                              </button>
                              <button
                                type="button"
                                className={styles.deleteIconButton}
                                aria-label={`Ta bort tillfällig ändring för ${override.className}`}
                                title="Ta bort tillfällig ändring"
                                onClick={() => {
                                  deleteOverride.reset()
                                  setOverrideToDelete(override)
                                }}>
                                <Trash2 size={19} aria-hidden="true" />
                              </button>
                            </div>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                )}
              </section>
            )}

            {scheduleToDelete && (
              <ConfirmDialog
                title="Ta bort lektion?"
                message={`Vill du ta bort ${scheduleToDelete.className}? Tillfälliga ändringar som hör till lektionen tas också bort.`}
                confirmLabel="Ta bort"
                onConfirm={handleDeleteSchedule}
                onCancel={() => setScheduleToDelete(null)}
                isPending={deleteSchedule.isPending}
                errorMessage={deleteSchedule.error instanceof Error ? deleteSchedule.error.message : undefined}
              />
            )}
            {overrideToDelete && (
              <ConfirmDialog
                title="Ta bort tillfällig ändring?"
                message={`Vill du ta bort ändringen för ${overrideToDelete.className}? Grundschemat återställs för perioden.`}
                confirmLabel="Ta bort"
                onConfirm={handleDeleteOverride}
                onCancel={() => setOverrideToDelete(null)}
                isPending={deleteOverride.isPending}
                errorMessage={deleteOverride.error instanceof Error ? deleteOverride.error.message : undefined}
              />
            )}
          </>
        )}
      </section>
    </main>
  )
}

export default SchedulePage
