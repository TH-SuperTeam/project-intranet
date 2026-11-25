import { useEffect, useRef, useState } from "react"
import { Plus } from "lucide-react"
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
import FormModal from "../components/common/FormModal"
import ScheduleDayView from "../components/Schedule/ScheduleDayView"
import ScheduleWeekView from "../components/Schedule/ScheduleWeekView"
import ScheduleEducationList from "../components/Schedule/ScheduleEducationList"
import ScheduleOverridesAccordion from "../components/Schedule/ScheduleOverridesAccordion"
import ScheduleViewControls from "../components/Schedule/ScheduleViewControls"
import type { DisplayLesson, EducationScheduleGroup, ScheduleView } from "../types/ScheduleView"
import { addDays, formatDate, getDateKey, getWeekday, isActiveOnDate } from "../utils/schedule/scheduleUtils"

import { useAuth } from "../hooks/useAuth"
import { UserType } from "../types/UserType"
import { AccessRole } from "../types/AccessRole"
import type { WeeklyScheduleInput, WeeklySchedule } from "../types/WeeklySchedule"
import type { ScheduleOverride, ScheduleOverrideInput } from "../types/ScheduleOverride"

type QuickChange = {
  schedule: WeeklySchedule
  date: string
  override: ScheduleOverride | null
}

const SchedulePage = () => {
  const formRef = useRef<HTMLDivElement>(null)
  const datePickerRef = useRef<HTMLInputElement>(null)
  const [view, setView] = useState<ScheduleView>("day")
  const [date, setDate] = useState(() => new Date())
  const [classId, setClassId] = useState<number | undefined>()
  const [classroomId, setClassroomId] = useState<number | undefined>()
  const [successMessage, setSuccessMessage] = useState("")
  const [showExpiredOverrides, setShowExpiredOverrides] = useState(false)

  const { user } = useAuth()

  const canManageSchedule = user?.userType === UserType.TEACHER || user?.accessRole === AccessRole.ADMIN
  const canViewAllSchools = canManageSchedule || user?.userType === UserType.STUDENT

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showOverrideForm, setShowOverrideForm] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState<WeeklySchedule | null>(null)
  const [scheduleToDelete, setScheduleToDelete] = useState<WeeklySchedule | null>(null)
  const [editingOverride, setEditingOverride] = useState<ScheduleOverride | null>(null)
  const [overrideToDelete, setOverrideToDelete] = useState<ScheduleOverride | null>(null)
  const [quickChange, setQuickChange] = useState<QuickChange | null>(null)

  useEffect(() => {
    const formIsOpen = showCreateForm || editingSchedule || showOverrideForm || editingOverride

    if (formIsOpen) {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }, [showCreateForm, editingSchedule, showOverrideForm, editingOverride])

  useEffect(() => {
    if (!successMessage) return

    const timeoutId = window.setTimeout(() => {
      setSuccessMessage("")
    }, 5000)

    return () => window.clearTimeout(timeoutId)
  }, [successMessage])

  const createSchedule = useCreateWeeklySchedule()
  const updateSchedule = useUpdateWeeklySchedule()
  const deleteSchedule = useDeleteWeeklySchedule()
  const createOverride = useCreateScheduleOverride()
  const updateOverride = useUpdateScheduleOverride()
  const deleteOverride = useDeleteScheduleOverride()
  const overrideMutation = editingOverride ? updateOverride : createOverride
  const formMutation = editingSchedule ? updateSchedule : createSchedule
  const quickChangeMutation = quickChange?.override ? updateOverride : createOverride

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

  const handleEditSchedule = (schedule: WeeklySchedule) => {
    createSchedule.reset()
    updateSchedule.reset()
    createOverride.reset()
    updateOverride.reset()
    setSuccessMessage("")
    setShowCreateForm(false)
    setShowOverrideForm(false)
    setEditingOverride(null)
    setEditingSchedule(schedule)
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

  const handleEditOverride = (override: ScheduleOverride) => {
    createOverride.reset()
    updateOverride.reset()
    setSuccessMessage("")
    setShowOverrideForm(false)
    setShowCreateForm(false)
    setEditingSchedule(null)
    setEditingOverride(override)
  }

  const cancelOverrideForm = () => {
    createOverride.reset()
    updateOverride.reset()
    setEditingOverride(null)
    setShowOverrideForm(false)
  }

  const options = useScheduleOptions(canViewAllSchools)
  const schedulesQuery = useWeeklySchedules({ classId, classroomId })
  const allSchedulesQuery = useWeeklySchedules()
  const overridesQuery = useScheduleOverrides()
  const schedules = schedulesQuery.data ?? []
  const overrides = overridesQuery.data ?? []
  const todayKey = getDateKey(new Date())
  const visibleOverrides = overrides.filter((override) => {
    const baseSchedule = allSchedulesQuery.data?.find((schedule) => schedule.id === override.weeklyScheduleId)
    const effectiveClassroomId = override.classroomId ?? baseSchedule?.classroomId

    return (
      (classId === undefined || override.classId === classId) &&
      (classroomId === undefined || effectiveClassroomId === classroomId)
    )
  })
  const displayedOverrides = visibleOverrides.filter(
    (override) => showExpiredOverrides || override.validUntil >= todayKey,
  )
  const educationGroups: EducationScheduleGroup[] = options.programs
    .map((program) => {
      const classes = options.allClasses
        .filter((schoolClass) => schoolClass.programId === program.id)
        .map((schoolClass) => ({
          schoolClass,
          schedules: schedules
            .filter((schedule) => schedule.classId === schoolClass.id)
            .sort((a, b) => a.weekday - b.weekday || a.startTime.localeCompare(b.startTime)),
        }))
        .filter((group) => group.schedules.length > 0)
        .sort((a, b) => (b.schoolClass.startDate ?? "").localeCompare(a.schoolClass.startDate ?? ""))

      return { program, classes }
    })
    .filter((group) => group.classes.length > 0)
  const openQuickChange = (schedule: WeeklySchedule, lessonDate: Date) => {
    const dateKey = getDateKey(lessonDate)
    const existingOverride = overrides.find(
      (override) =>
        override.weeklyScheduleId === schedule.id && override.validFrom <= dateKey && override.validUntil >= dateKey,
    )

    createOverride.reset()
    updateOverride.reset()
    setShowCreateForm(false)
    setShowOverrideForm(false)
    setEditingSchedule(null)
    setEditingOverride(null)
    setQuickChange({ schedule, date: dateKey, override: existingOverride ?? null })
  }
  const handleQuickChangeSave = (override: ScheduleOverrideInput) => {
    if (!quickChange) return

    const onSuccess = () => {
      setQuickChange(null)
      setSuccessMessage(
        quickChange.override ? "Den tillfälliga ändringen har uppdaterats." : "Den tillfälliga ändringen har sparats.",
      )
    }

    if (quickChange.override) {
      updateOverride.mutate({ id: quickChange.override.id, override }, { onSuccess })
    } else {
      createOverride.mutate(override, { onSuccess })
    }
  }
  const closeQuickChange = () => {
    if (quickChangeMutation.isPending) return
    createOverride.reset()
    updateOverride.reset()
    setQuickChange(null)
  }
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
      : formatDate(date, {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })

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
            <ScheduleViewControls
              view={view}
              onViewChange={setView}
              classes={options.classes}
              classrooms={options.classrooms}
              classId={classId}
              classroomId={classroomId}
              onClassChange={setClassId}
              onClassroomChange={setClassroomId}
              getClassDisplayName={getClassDisplayName}
              date={date}
              dateTitle={dateTitle}
              datePickerRef={datePickerRef}
              onOpenDatePicker={openDatePicker}
              onMoveDate={moveDate}
              onSelectDate={setDate}
              onToday={() => setDate(new Date())}
            />

            {view === "day" && (
              <ScheduleDayView
                rooms={rooms}
                lessons={dayLessons}
                date={date}
                canManageSchedule={canManageSchedule}
                getClassDisplayName={getClassDisplayName}
                getClassSchool={getClassSchool}
                onQuickChange={openQuickChange}
              />
            )}

            {view === "week" && (
              <ScheduleWeekView
                rooms={rooms}
                weekDates={weekDates}
                canManageSchedule={canManageSchedule}
                getClassDisplayName={getClassDisplayName}
                getClassSchool={getClassSchool}
                getLessonsForDate={getLessonsForDate}
                onQuickChange={openQuickChange}
              />
            )}

            {view === "list" &&
              (schedules.length === 0 ? (
                <p className={styles.empty}>Det finns inga schemalagda lektioner.</p>
              ) : (
                <ScheduleEducationList
                  groups={educationGroups}
                  canManageSchedule={canManageSchedule}
                  getClassDisplayName={getClassDisplayName}
                  getClassSchool={getClassSchool}
                  onEdit={handleEditSchedule}
                  onDelete={setScheduleToDelete}
                />
              ))}

            {view === "list" && (
              <ScheduleOverridesAccordion
                overrides={displayedOverrides}
                schedules={allSchedulesQuery.data ?? []}
                showExpired={showExpiredOverrides}
                canManageSchedule={canManageSchedule}
                getClassDisplayName={getClassDisplayName}
                getClassSchool={getClassSchool}
                onShowExpiredChange={setShowExpiredOverrides}
                onEdit={handleEditOverride}
                onDelete={(override) => {
                  deleteOverride.reset()
                  setOverrideToDelete(override)
                }}
              />
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
            {quickChange && canManageSchedule && (
              <FormModal
                title="Snabbändring av lektion"
                onClose={closeQuickChange}
                isPending={quickChangeMutation.isPending}>
                <ScheduleOverrideForm
                  key={`quick-${quickChange.schedule.id}-${quickChange.date}-${quickChange.override?.id ?? "new"}`}
                  schedules={allSchedulesQuery.data ?? []}
                  classrooms={options.classrooms}
                  getClassDisplayName={getClassDisplayName}
                  scheduleOverride={quickChange.override ?? undefined}
                  initialWeeklyScheduleId={quickChange.schedule.id}
                  initialDate={quickChange.date}
                  lockScheduleSelection
                  isPending={quickChangeMutation.isPending}
                  error={quickChangeMutation.error instanceof Error ? quickChangeMutation.error.message : null}
                  onSubmit={handleQuickChangeSave}
                  onCancel={closeQuickChange}
                />
              </FormModal>
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
