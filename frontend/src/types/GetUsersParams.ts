export type GetUsersParams = {
    search: string;
    page: number;
    size: number;
    school?: string;
    programId?: number;
    classId?: number;
    status?: string;
};
