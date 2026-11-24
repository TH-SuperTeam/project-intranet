export type OverrideType = "CANCEL" | "MODIFY" | "ADD_ROOM"

export type ScheduleOverride = {
  id: number
  weeklyScheduleId: number
  classId: number
  className: string
  classroomId: number | null
  classroomName: string | null
  overrideType: OverrideType
  startTime: string | null
  endTime: string | null
  validFrom: string
  validUntil: string
  note: string | null
}

export type ScheduleOverrideInput = {
  weeklyScheduleId: number
  overrideType: OverrideType
  classroomId: number | null
  startTime: string | null
  endTime: string | null
  validFrom: string
  validUntil: string
  note: string | null
}
