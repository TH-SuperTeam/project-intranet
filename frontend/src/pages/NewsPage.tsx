
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "../components/News/News.module.css";
import NewsList from "../components/News/NewsList";
import CreateButton from "../components/common/CreateButton";

import { useAudience } from "../hooks/useAudience";
import { useCanManageNews } from "../hooks/NewsHooks/useCanManageNews";

const NewsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [successMessage] = useState<string>(
        () => location.state?.successMessage ?? "",
    );

    useEffect(() => {
        if (location.state?.successMessage) {
            navigate(location.pathname, {
                replace: true,
                state: null,
            });
        }
    }, [location.state, location.pathname, navigate]);

    const { audience } = useAudience();
    const canManageNews = useCanManageNews();

    return (
        <main className={styles.newsSection}>
            <header className={styles.header}>
                <h1>Nyheter</h1>

                {canManageNews && (
                    <CreateButton to="/news/create">
                        + Skapa nyhet
                    </CreateButton>
                )}
            </header>

            {successMessage && (
                <p role="status" className={styles.successMessage}>
                    {successMessage}
                </p>
            )}

            <NewsList audience={audience} />
        </main>
    );
};

export default NewsPage;
