import NewsCard from "./NewsCard";
import type { TargetAudience } from "../../types/TargetAudience";
import styles from "./News.module.css";
import { useNews } from "../../hooks/useNews";

type NewsListProps = {
    audience: TargetAudience;
};

const NewsList = ({ audience }: NewsListProps) => {
    const { data: news, isPending, isError } = useNews({ audience });

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
            {news.map(news => (
                <NewsCard key={news.id} news={news} />
            ))}
        </ul>
    );
};

export default NewsList;
