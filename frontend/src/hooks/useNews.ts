import { useQuery } from "@tanstack/react-query";
import { getNews } from "../services/newsApi";
import type { TargetAudience } from "../types/TargetAudience";

type NewsProps = {
    audience: TargetAudience;
};

const useNews = ({ audience }: NewsProps) => {
    return useQuery({
        queryKey: ["news", audience],
        queryFn: () => getNews(audience),
    });
};

export { useNews };
