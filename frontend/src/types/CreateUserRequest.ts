import type { AccessRole } from "./AccessRole";
import type { UserType } from "./UserType";

export interface CreateUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: UserType;
    accessRole: AccessRole;
}
