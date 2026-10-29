import type { News } from "../../types/News";
import BackLink from "../common/BackLink";
import styles from "./News.module.css";
import { useDeleteNews } from "../../hooks/useDeleteNews";
import { useCanManageNews } from "../../hooks/useCanManageNews";

import DeleteButton from "../common/DeleteButton";
import EditButton from "../common/EditButton";
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
                        <time
                            dateTime={news.createdAt}
                            className={styles.detailsDate}
                        >
                            {formattedDate}
                        </time>
                        <h1 className={styles.detailsTitle}>{news.title}</h1>
                    </header>

                    <div className={styles.detailsDivider} />

                    <p className={styles.detailsContent}>{news.content}</p>
                </div>
                {mutation.isError && (
                    <p role="alert" className="text-right text-(--color-error)">
                        {mutation.error.message}
                    </p>
                )}
                <div className="flex items-center justify-end gap-2">
                    {canManageNews && (
                        <EditButton to={`/news/${news.id}/edit`} />
                    )}
                    {canManageNews && (
                        <DeleteButton
                            onClick={handleDelete}
                            isPending={mutation.isPending}
                        />
                    )}
                </div>
            </article>
        </>
    );
};

export default NewsDetails;
