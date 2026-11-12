import type { UserType } from "./UserType";

export interface UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    profileImageUrl: string | null;
    email: string;
    userType: UserType;
    bio: string | null;
}