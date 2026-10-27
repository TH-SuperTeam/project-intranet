import { Link } from "react-router-dom";
import styles from "../components/News/News.module.css";
import NewsList from "../components/News/NewsList";

const NewsPage = () => {
    return (
        <div>
            <h1>News</h1>
            <p>This is the news page.</p>
            <Link to="/news/create" className={styles.createButton}>
                Skapa nyhet
            </Link>

            <NewsList />
        </div>
    );
};

export default NewsPage;
