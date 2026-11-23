import type { UserType } from "./UserType";

export interface PublicUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profileImageUrl: string | null;
    userType: UserType;
    school: "TH" | "VH" | null;
    programId: number | null;
    programName: string | null;
    classId: number | null;
    className: string | null;
}
