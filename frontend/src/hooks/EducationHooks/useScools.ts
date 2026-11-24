import { useQuery } from "@tanstack/react-query";
import { getSchools } from "../../services/schoolApi";

export const useSchools = () => {
    return useQuery({
        queryKey: ["schools"],
        queryFn: getSchools,
        staleTime: Infinity,
    });
};
