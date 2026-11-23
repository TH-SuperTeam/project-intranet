import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/usersApi";
import type { UserFilters } from "../../types/UserFilters";

const useUsers = (search: string, filters: UserFilters) => {
    return useQuery({
        queryKey: ["users", search, filters],
        queryFn: () => getUsers(search, filters),
        select: data => data.content,
    });
};

export { useUsers };
