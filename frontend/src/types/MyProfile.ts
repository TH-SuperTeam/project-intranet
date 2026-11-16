import type { AccessRole } from "./AccessRole"
import type { UserType } from "./UserType"

export interface MyProfile {
  id: number
  firstName: string
  lastName: string
  email: string
  profileImageUrl: string | null
  userType: UserType
  bio: string | null
  accessRole: AccessRole
  createdAt: string
}
