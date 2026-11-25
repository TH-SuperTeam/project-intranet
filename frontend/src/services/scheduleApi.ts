import { apiFetch } from "./api"
import type { WeeklySchedule, WeeklyScheduleInput } from "../types/WeeklySchedule"
import type { ScheduleOverride, ScheduleOverrideInput } from "../types/ScheduleOverride"

export type ScheduleFilters = {
  classId?: number
  classroomId?: number
}

type ApiError = {
  message?: string
}

const getErrorMessage = async (response: Response, fallback: string): Promise<string> => {
  const body = (await response.json().catch(() => null)) as ApiError | null
  return body?.message ?? fallback
}

export const getWeeklySchedules = async (filters: ScheduleFilters = {}): Promise<WeeklySchedule[]> => {
  const params = new URLSearchParams()

  if (filters.classId !== undefined) {
    params.set("classId", String(filters.classId))
  }

  if (filters.classroomId !== undefined) {
    params.set("classroomId", String(filters.classroomId))
  }

  const query = params.size > 0 ? `?${params.toString()}` : ""
  const response = await apiFetch(`/api/weekly-schedules${query}`)

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Kunde inte hämta schemat."))
  }

  return response.json()
}

export const getScheduleOverrides = async (): Promise<ScheduleOverride[]> => {
  const response = await apiFetch("/api/schedule-overrides")

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Kunde inte hämta schemaändringarna."))
  }

  return response.json()
}

export const createWeeklySchedule = async (schedule: WeeklyScheduleInput): Promise<WeeklySchedule> => {
  const response = await apiFetch("/api/weekly-schedules", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedule),
  })

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Kunde inte skapa lektionen."))
  }

  return response.json()
}

export const updateWeeklySchedule = async (id: number, schedule: WeeklyScheduleInput): Promise<WeeklySchedule> => {
  const response = await apiFetch(`/api/weekly-schedules/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedule),
  })

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Kunde inte uppdatera lektionen."))
  }

  return response.json()
}

export const deleteWeeklySchedule = async (id: number): Promise<void> => {
  const response = await apiFetch(`/api/weekly-schedules/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Kunde inte ta bort lektionen."))
  }
}

export const createScheduleOverride = async (override: ScheduleOverrideInput): Promise<ScheduleOverride> => {
  const response = await apiFetch("/api/schedule-overrides", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(override),
  })

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Kunde inte spara schemaändringen."))
  }

  return response.json()
}

export const updateScheduleOverride = async (id: number, override: ScheduleOverrideInput): Promise<ScheduleOverride> => {
  const response = await apiFetch(`/api/schedule-overrides/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(override),
  })

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Kunde inte uppdatera schemaändringen."))
  }

  return response.json()
}

export const deleteScheduleOverride = async (id: number): Promise<void> => {
  const response = await apiFetch(`/api/schedule-overrides/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Kunde inte ta bort schemaändringen."))
  }
}
