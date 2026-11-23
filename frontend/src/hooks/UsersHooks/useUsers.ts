import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/usersApi";
import type { GetUsersParams } from "../../types/GetUsersParams";

const useUsers = (params: GetUsersParams) => {
    return useQuery({
        queryKey: ["users", params],
        queryFn: () => getUsers(params),
    });
};

export { useUsers };
