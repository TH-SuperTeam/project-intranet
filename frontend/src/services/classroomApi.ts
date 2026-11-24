import { apiFetch } from "./api"
import type { Classroom } from "../types/Classroom"

export const getClassrooms = async (): Promise<Classroom[]> => {
  const response = await apiFetch("/api/classrooms")

  if (!response.ok) {
    throw new Error("Kunde inte hämta klassrum.")
  }

  return response.json()
}
