import type { UserType } from "./UserType";
import type { AccessRole } from "./AccessRole";
import type { Status } from "./Status";
import type { SchoolName } from "./SchoolName";

export interface UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    profileImageUrl: string | null;
    email: string;
    userType: UserType;
    accessRole: AccessRole;
    status: Status | null;
    bio: string | null;
    school: SchoolName | null;
    programId: number | null;
    programName: string | null;
    classId: number | null;
    className: string | null;
}
