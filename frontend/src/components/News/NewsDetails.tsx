import { Link } from "react-router-dom";
import type { News } from "../../types/News";
import BackLink from "../common/BackLink";
import styles from "./News.module.css";
import { Pencil, Trash2 } from "lucide-react";
import { useDeleteNews } from "../../hooks/useDeleteNews";
import { useCanManageNews } from "../../hooks/useCanManageNews";

interface NewsDetailsProps {
    news: News;
}

const NewsDetails = ({ news }: NewsDetailsProps) => {
    const formattedDate = new Date(news.createdAt).toLocaleDateString("sv-SE", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const canManageNews = useCanManageNews();

    const mutation = useDeleteNews();

    // Hanterar klick på Ta bort-knappen och ber användaren bekräfta borttagningen.
    const handleDelete = () => {
        if (!window.confirm("Är du säker på att du vill ta bort nyheten?")) {
            return;
        }

        mutation.mutate(news.id);
    };

    return (
        <>
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
            <div className="flex items-center justify-end gap-2">
                {canManageNews && (
                    <Link
                        to={`/news/${news.id}/edit`}
                        className="inline-flex items-center gap-2 rounded-lg bg-(--color-primary-soft) px-3 py-2 text-sm font-medium text-(--color-primary) transition-colors hover:bg-(--color-surface-hover)"
                    >
                        <Pencil size={16} />
                        Redigera
                    </Link>
                )}
                {canManageNews && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="inline-flex items-center gap-2 rounded-lg bg-(--color-error-light) px-3 py-2 text-sm font-medium text-(--color-error) transition-colors hover:opacity-80"
                    >
                        <Trash2 size={16} />
                        Ta bort
                    </button>
                )}
            </div>
        </>
    );
};

export default NewsDetails;
