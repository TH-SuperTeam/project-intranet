import type { News } from "../../types/News";
import BackLink from "../common/BackLink";
import styles from "./News.module.css";
import { useDeleteNews } from "../../hooks/useDeleteNews";
import { useCanManageNews } from "../../hooks/useCanManageNews";
import ConfirmDialog from "../common/ConfirmDialog";

import DeleteButton from "../common/DeleteButton";
import EditButton from "../common/EditButton";
import { useState } from "react";
interface NewsDetailsProps {
    news: News;
}

const NewsDetails = ({ news }: NewsDetailsProps) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const formattedDate = new Date(news.createdAt).toLocaleDateString("sv-SE", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const canManageNews = useCanManageNews();

    const mutation = useDeleteNews();

    // Hanterar visningen av bekräftelsedialogen för att radera nyheten
    const handleDelete = () => {
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        setShowConfirm(false);
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

                    {showConfirm && (
                        <ConfirmDialog
                            message="Är du säker på att du vill ta bort nyheten?"
                            onConfirm={confirmDelete}
                            onCancel={() => setShowConfirm(false)}
                        />
                    )}
                </div>
            </article>
        </>
    );
};

export default NewsDetails;
