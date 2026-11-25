import { useQuery } from "@tanstack/react-query";
import { getClasses } from "../../services/schoolClassApi";

const useAllClasses = (includeArchived: boolean = false) => {
    return useQuery({
        queryKey: ["classes", "all", includeArchived],
        queryFn: () => getClasses(includeArchived),
    });
};

export { useAllClasses };
