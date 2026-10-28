import type { News } from "../../types/News";
import styles from "./News.module.css";

interface NewsDetailsProps {
    news: News;
}

const NewsDetails = ({ news }: NewsDetailsProps) => {
    const formattedDate = new Date(news.createdAt).toLocaleDateString("sv-SE", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <>
            <div className={styles.cardHeader}>
                <h2 className={styles.title}>{news.title}</h2>

                <time dateTime={news.createdAt} className={styles.date}>
                    {formattedDate}
                </time>
            </div>

            <p className={styles.content}>{news.content}</p>
        </>
    );
};

export default NewsDetails;
