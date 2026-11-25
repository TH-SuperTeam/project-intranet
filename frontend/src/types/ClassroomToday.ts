export type ClassroomAvailability = "FREE" | "OCCUPIED"

export type ClassroomBooking = {
  classId: number
  className: string
  programName: string
  school: "TH" | "VH"
  startTime: string
  endTime: string
}

export type ClassroomStatus = {
  id: number
  name: string
  status: ClassroomAvailability
  bookings: ClassroomBooking[]
}

export type ClassroomToday = {
  date: string
  classrooms: ClassroomStatus[]
}
