import type { AccessRole } from "./AccessRole";
import type { SchoolName } from "./SchoolName";
import type { UserType } from "./UserType";

export interface MyProfile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profileImageUrl: string | null;
    userType: UserType;
    bio: string | null;
    accessRole: AccessRole;
    createdAt: string;
    school: SchoolName | null;
    programId: number | null;
    programName: string | null;
    classId: number | null;
    className: string | null;
}
