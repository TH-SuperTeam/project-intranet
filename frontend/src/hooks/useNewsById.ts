import { useQuery } from "@tanstack/react-query";
import { getNewsById } from "../services/newsApi";
import type { TargetAudience } from "../types/TargetAudience";

const useNewsById = (id: number, audience: TargetAudience) => {
    return useQuery({
        queryKey: ["news", id, audience],
        queryFn: () => getNewsById(id, audience),
    });
};

export { useNewsById };
