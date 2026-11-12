import type { CreateUserRequest } from "../types/CreateUserRequest"
import type { User } from "../types/User"
import { apiFetch } from "./api"
import type { Status } from "../types/Status"
import type { PublicUser } from "../types/PublicUser"
import type { MyProfile } from "../types/MyProfile"
import type { UpdateProfileRequest } from "../types/UpdateProfileRequest"
import type { UserProfile } from "../types/UserProfile"

export const createUser = async (user: CreateUserRequest) => {
  const res = await apiFetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })

  if (res.status === 409) {
    throw new Error("E-postadressen används redan av ett annat konto.")
  }

  if (res.status === 403) {
    throw new Error("Du saknar behörighet att skapa användare.")
  }

  if (!res.ok) {
    throw new Error("Kunde inte skapa användare.")
  }

  return res.json()
}

export const getUsers = async (search: string): Promise<(User | PublicUser)[]> => {
  const params = new URLSearchParams({ search })

  const res = await apiFetch(`/api/users?${params.toString()}`)

  if (!res.ok) {
    throw new Error(`Kunde inte hämta användare (${res.status}).`)
  }

  return res.json()
}

export const updateUserStatus = async (userId: number, status: Status): Promise<User> => {
  const res = await apiFetch(`/api/users/${userId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })

  if (res.status === 403) {
    throw new Error("Du saknar behörighet att ändra användarstatus.")
  }

  if (res.status === 404) {
    throw new Error("Användaren kunde inte hittas.")
  }

  if (!res.ok) {
    throw new Error("Kunde inte uppdatera användarens status.")
  }

  return res.json()
}

export const getMyProfile = async (): Promise<MyProfile> => {
  const res = await apiFetch("/api/users/me")

  if (!res.ok) {
    throw new Error("Kunde inte hämta din profil.")
  }

  return res.json()
}

export const updateMyProfile = async (profile: UpdateProfileRequest): Promise<MyProfile> => {
  const res = await apiFetch("/api/users/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  })

  if (res.status === 409) {
    throw new Error("E-postadressen används redan av ett annat konto.")
  }

  if (res.status === 400) {
    throw new Error("Kontrollera att alla uppgifter är korrekt ifyllda.")
  }

  if (!res.ok) {
    throw new Error("Kunde inte uppdatera din profil.")
  }

  return res.json()
}

export const getUserProfile = async (userId: number): Promise<UserProfile> => {
  const res = await apiFetch(`/api/users/${userId}`)

  if (res.status === 404) {
    throw new Error("Användaren kunde inte hittas.")
  }

  if (!res.ok) {
    throw new Error("Kunde inte hämta användarens profil.")
  }

  return res.json()
}
