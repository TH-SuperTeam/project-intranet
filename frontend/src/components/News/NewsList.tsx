import NewsCard from "./NewsCard";
import type { News } from "../../types/News";
import { getNews } from "../../services/newsApi";
import { useQuery } from "@tanstack/react-query";
import type { TargetAudience } from "../../types/TargetAudience";

type NewsListProps = {
    audience: TargetAudience;
};

const NewsList = ({ audience }: NewsListProps) => {
    const {
        data: news,
        isPending,
        isError,
        error,
    } = useQuery({
        queryKey: ["news", audience],
        queryFn: () => getNews(audience),
    });

    if (isPending) {
        return <p>Laddar nyheter...</p>;
    }

    if (isError) {
        return <p>{error.message}</p>;
    }

    return (
        <ul>
            {news.map((item: News) => (
                <NewsCard key={item.id} news={item} />
            ))}
        </ul>
    );
};

export default NewsList;
