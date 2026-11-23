import NewsCard from "./NewsCard";
import type { TargetAudience } from "../../types/TargetAudience";
import styles from "./News.module.css";
import { useNews } from "../../hooks/NewsHooks/useNews";
import { useState } from "react";
import Pagination from "../common/Pagination";
import { ListSkeleton } from "../Loaders/Skeletons/ListSkeleton";

type NewsListProps = {
    audience: TargetAudience;
    search: string;
};

const NewsList = ({ audience, search }: NewsListProps) => {
    return (
        <PaginatedNewsList key={search} audience={audience} search={search} />
    );
};

const PaginatedNewsList = ({ audience, search }: NewsListProps) => {
    const [page, setPage] = useState(0);

    const {
        data: news,
        isPending,
        isError,
    } = useNews({ audience, page, search });

    if (isPending) {
        return <ListSkeleton variant="news" />;
    }

    if (isError) {
        return (
            <div className={styles.errorState} role="alert">
                Det gick inte att ladda nyheterna.
            </div>
        );
    }

    if (news.content.length === 0) {
        return (
            <div className={styles.emptyState}>
                {search.trim() ? (
                    <>
                        <h3>Inga sökresultat</h3>
                        <p>Inga nyheter matchade din sökning.</p>
                    </>
                ) : (
                    <>
                        <h3>Inga nyheter att visa</h3>
                        <p>Det finns inga publicerade nyheter just nu.</p>
                    </>
                )}
            </div>
        );
    }

    return (
        <>
            <ul className={styles.newsList}>
                {news.content.map((news) => (
                    <NewsCard key={news.id} news={news} />
                ))}
            </ul>

            <Pagination
                currentPage={news.number}
                totalPages={news.totalPages}
                onPageChange={setPage}
                ariaLabel="Nyhetssidor"
            />
        </>
    );
};

export default NewsList;
