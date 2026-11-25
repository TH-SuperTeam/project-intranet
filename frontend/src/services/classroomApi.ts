import { apiFetch } from "./api"
import type { Classroom } from "../types/Classroom"
import type { ClassroomToday } from "../types/ClassroomToday"

export const getClassrooms = async (): Promise<Classroom[]> => {
  const response = await apiFetch("/api/classrooms")

  if (!response.ok) {
    throw new Error("Kunde inte hämta klassrum.")
  }

  return response.json()
}

export const getClassroomsToday = async (): Promise<ClassroomToday> => {
  const response = await apiFetch("/api/classrooms/today")

  if (!response.ok) {
    throw new Error("Kunde inte hämta dagens klassrumsschema.")
  }

  return response.json()
}
