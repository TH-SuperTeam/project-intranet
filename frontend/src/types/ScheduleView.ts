import type { Program } from "./Program"
import type { ScheduleOverride } from "./ScheduleOverride"
import type { SchoolClass } from "./SchoolClass"
import type { WeeklySchedule } from "./WeeklySchedule"

export type ScheduleView = "day" | "week" | "list"

export type DisplayLesson = {
  schedule: WeeklySchedule
  classroomId: number
  classroomName: string
  startTime: string
  endTime: string
  overrideType?: ScheduleOverride["overrideType"]
}

export type EducationScheduleGroup = {
  program: Program
  classes: {
    schoolClass: SchoolClass
    schedules: WeeklySchedule[]
  }[]
}
