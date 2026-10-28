import { useQuery } from "@tanstack/react-query";
import { getNewsById } from "../services/newsApi";

const useNewsById = (id: number) => {
    return useQuery({
        queryKey: ["news", id],
        queryFn: () => getNewsById(id),
    });
};

export { useNewsById };
