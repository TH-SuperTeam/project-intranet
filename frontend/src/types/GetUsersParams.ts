import type { UserFilters } from "./UserFilters";

export type GetUsersParams = {
    search: string;
    page: number;
    size: number;
    filters: UserFilters;
};
