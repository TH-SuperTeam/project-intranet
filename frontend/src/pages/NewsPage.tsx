import { Link } from "react-router-dom";
import styles from "../components/News/News.module.css";
import NewsList from "../components/News/NewsList";
import { TargetAudience } from "../types/TargetAudience";
import { useAudience } from "../hooks/useAudience";

const NewsPage = () => {
    const { audience, setAudience } = useAudience();

    return (
        <main className={styles.newsSection}>
            <header className={styles.header}>
                <h1>Nyheter</h1>

                <Link to="/news/create" className={styles.createButton}>
                    + Skapa nyhet
                </Link>
            </header>

            {/* Tillfälligt filter tills inloggning är implementerad */}
            <select
                value={audience}
                onChange={e => setAudience(e.target.value as TargetAudience)}
            >
                <option value={TargetAudience.STUDENT}>Student</option>
                <option value={TargetAudience.TEACHER}>Lärare</option>
            </select>

            <NewsList audience={audience} />
        </main>
    );
};

export default NewsPage;
