import type { PublicUser } from "../types/PublicUser";
import type { User } from "../types/User";
import type { UserFilters } from "../types/UserFilters";
import { Status } from "../types/Status";
import type { StatusFilter } from "../types/StatusFilter";

const matchesStatusFilter = (
    user: User | PublicUser,
    statusFilter: StatusFilter,
): boolean => {
    if (statusFilter === "ALL") return true;

    // PublicUser saknar status, och icke-admin ser inte statusfiltret
    if (!("status" in user)) return true;

    if (statusFilter === "ACTIVE") return user.status === Status.ACTIVE;

    return user.status !== Status.ACTIVE;
};

export const filterUsers = (
    users: (User | PublicUser)[],
    filters: UserFilters,
) => {
    return users.filter(user => {
        const matchesSchool =
            filters.school === null || user.school === filters.school;
        const matchesProgram =
            filters.programId === null || user.programId === filters.programId;
        const matchesClass =
            filters.classId === null || user.classId === filters.classId;
        const matchesStatus = matchesStatusFilter(user, filters.status);

        return matchesSchool && matchesProgram && matchesClass && matchesStatus;
    });
};
