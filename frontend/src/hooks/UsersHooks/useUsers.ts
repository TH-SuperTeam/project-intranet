import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/usersApi";

const useUsers = (search: string) => {
    return useQuery({
        queryKey: ["users", search],
        queryFn: () => getUsers(search),
    });
};

export { useUsers };
