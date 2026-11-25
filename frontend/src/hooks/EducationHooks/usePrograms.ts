import { useQuery } from "@tanstack/react-query";
import { getPrograms } from "../../services/programApi";

const usePrograms = (includeArchived: boolean = false) => {
    return useQuery({
        queryKey: ["programs", includeArchived],
        queryFn: () => getPrograms(includeArchived),
    });
};

export { usePrograms };
