export interface AdminUpdateUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    programId: number;
    classId: number | null;
}
