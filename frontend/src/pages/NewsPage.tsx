import { Link } from "react-router-dom";
import styles from "../components/News/News.module.css";
import NewsList from "../components/News/NewsList";
import { TargetAudience } from "../types/TargetAudience";
import { useState } from "react";

const NewsPage = () => {
    const [audience, setAudience] = useState<TargetAudience>(
        TargetAudience.ALL,
    );
    return (
        <div>
            <h1>News</h1>
            <p>This is the news page.</p>
            <Link to="/news/create" className={styles.createButton}>
                Skapa nyhet
            </Link>

            <select
                value={audience}
                onChange={e => setAudience(e.target.value as TargetAudience)}
            >
                <option value="STUDENT">Student</option>
                <option value="TEACHER">Lärare</option>
            </select>
            <NewsList audience={audience} />
        </div>
    );
};

export default NewsPage;
