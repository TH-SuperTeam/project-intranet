import type { AccessRole } from "./AccessRole";
import type { SchoolName } from "./SchoolName";
import type { Status } from "./Status";
import type { UserType } from "./UserType";

export type AuthUser = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    userType: UserType;
    accessRole: AccessRole;
    status: Status;
    createdAt: string;
    profileImageUrl: string | null;
    school: SchoolName | null;
};
