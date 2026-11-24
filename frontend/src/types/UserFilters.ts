import type { SchoolName } from "./SchoolName";
import type { Status } from "./Status";
import type { UserType } from "./UserType";

export interface UserFilters {
    school: SchoolName | null;
    programId: number | null;
    classId: number | null;
    status: Status | null;
    userType: UserType | null;
}
