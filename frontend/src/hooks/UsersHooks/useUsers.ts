import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/usersApi";

const useUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: () => getUsers(),
    });
};

export { useUsers };
