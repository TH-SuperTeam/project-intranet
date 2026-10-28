import type { News } from "../../types/News";
import styles from "./News.module.css";

interface NewsCardProps {
    news: News;
}

const NewsCard = ({ news }: NewsCardProps) => {
    const formattedDate = new Date(news.createdAt).toLocaleDateString("sv-SE", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <li className={styles.newsCard}>
            <div className={styles.cardHeader}>
                <h2 className={styles.title}>{news.title}</h2>

                <time dateTime={news.createdAt} className={styles.date}>
                    {formattedDate}
                </time>
            </div>

            <p className={styles.content}>{news.content}</p>
        </li>
    );
};

export default NewsCard;
