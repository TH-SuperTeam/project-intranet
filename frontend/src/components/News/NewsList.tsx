import NewsCard from "./NewsCard";
import type { News } from "../../types/News";
import { getNews } from "../../services/newsApi";
import { useQuery } from "@tanstack/react-query";

const NewsList = () => {
    const {
        data: news,
        isPending,
        isError,
        error,
    } = useQuery({
        queryKey: ["news"],
        queryFn: getNews,
    });

    if (isPending) {
        return <p>Laddar nyheter...</p>;
    }

    if (isError) {
        return <p>{error.message}</p>;
    }

    return (
        <>
            <ul>
                {news.map((news: News) => (
                    <NewsCard key={news.id} news={news}></NewsCard>
                ))}
            </ul>
        </>
    );
};

export default NewsList;
