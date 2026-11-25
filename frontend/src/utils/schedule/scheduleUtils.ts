import type { ScheduleOverride } from "../../types/ScheduleOverride"
import type { WeeklySchedule } from "../../types/WeeklySchedule"

export const shortWeekdays = ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"]

export const formatTime = (time: string) => time.slice(0, 5)

export const formatDate = (date: Date, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("sv-SE", options).format(date)

export const getDateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export const getWeekday = (date: Date) => ((date.getDay() + 6) % 7) + 1

export const addDays = (date: Date, days: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const isActiveOnDate = (schedule: Pick<WeeklySchedule, "validFrom" | "validUntil">, date: Date) => {
  const dateKey = getDateKey(date)
  return schedule.validFrom <= dateKey && schedule.validUntil >= dateKey
}

export const getOverrideLabel = (type: ScheduleOverride["overrideType"]) => {
  if (type === "CANCEL") return "Inställd"
  if (type === "MODIFY") return "Tillfälligt ändrad"
  return "Extra klassrum"
}
