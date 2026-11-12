import { useQuery } from "@tanstack/react-query";
import { getPublicNews } from "../../services/newsApi";

export const usePublicNews = () => {
    return useQuery({
        queryKey: ["publicNews"],
        queryFn: getPublicNews,
        refetchInterval: 30 * 60 * 1000,
        refetchIntervalInBackground: true,
    });
};
