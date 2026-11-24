import type { AccessRole } from "./AccessRole";
import type { SchoolName } from "./SchoolName";
import type { Status } from "./Status";
import type { UserType } from "./UserType";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    userType: UserType;
    accessRole: AccessRole;
    status: Status;
    profileImageUrl: string | null;
    school: SchoolName | null;
    programId: number | null;
    programName: string | null;
    classId: number | null;
    className: string | null;
}
