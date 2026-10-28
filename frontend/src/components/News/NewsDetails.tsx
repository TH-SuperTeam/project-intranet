import type { News } from "../../types/News";
import BackLink from "../common/BackLink";
import styles from "./News.module.css";

interface NewsDetailsProps {
    news: News;
}

const NewsDetails = ({ news }: NewsDetailsProps) => {
    const formattedDate = new Date(news.createdAt).toLocaleDateString("sv-SE", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <article className={styles.newsDetails}>
            <BackLink to="/news" />

            <div className={styles.detailsCard}>
                <header className={styles.detailsHeader}>
                    <h1 className={styles.detailsTitle}>{news.title}</h1>

                    <time
                        dateTime={news.createdAt}
                        className={styles.detailsDate}
                    >
                        {formattedDate}
                    </time>
                </header>

                <div className={styles.detailsDivider} />

                <p className={styles.detailsContent}>{news.content}</p>
            </div>
        </article>
    );
};

export default NewsDetails;
