export type WeeklySchedule = {
  id: number
  classId: number
  className: string
  classroomId: number
  classroomName: string
  weekday: number // Backend: 1–7
  startTime: string
  endTime: string
  validFrom: string // YYYY-MM-DD
  validUntil: string // YYYY-MM-DD
}

export type WeeklyScheduleInput = {
  classId: number
  classroomId: number
  weekday: number
  startTime: string
  endTime: string
  validFrom: string
  validUntil: string
}
