import type { AccessRole } from "./AccessRole"
import type { Status } from "./Status"
import type { UserType } from "./UserType"

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  userType: UserType
  accessRole: AccessRole
  status: Status
  profileImageUrl: string | null
}
