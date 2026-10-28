import NewsCard from "./NewsCard";
import { getNews } from "../../services/newsApi";
import { useQuery } from "@tanstack/react-query";
import type { TargetAudience } from "../../types/TargetAudience";
import styles from "./News.module.css";

type NewsListProps = {
    audience: TargetAudience;
};

const NewsList = ({ audience }: NewsListProps) => {
    const {
        data: news,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["news", audience],
        queryFn: () => getNews(audience),
    });

    if (isPending) {
        return <div className={styles.state}>Laddar nyheter...</div>;
    }

    if (isError) {
        return (
            <div className={styles.errorState} role="alert">
                Det gick inte att ladda nyheterna.
            </div>
        );
    }

    if (news.length === 0) {
        return (
            <div className={styles.emptyState}>
                <h3>Inga nyheter att visa</h3>
                <p>Det finns inga publicerade nyheter just nu.</p>
            </div>
        );
    }

    return (
        <ul className={styles.newsList}>
            {news.map((item) => (
                <NewsCard key={item.id} news={item} />
            ))}
        </ul>
    );
};

export default NewsList;
