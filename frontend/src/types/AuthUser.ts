import type { AccessRole } from "./AccessRole"
import type { UserType } from "./UserType"

export type AuthUser = {
  id: number
  firstName: string
  lastName: string
  email: string
  userType: UserType
  accessRole: AccessRole
  status: string
  createdAt: string
  profileImageUrl: string | null
}
