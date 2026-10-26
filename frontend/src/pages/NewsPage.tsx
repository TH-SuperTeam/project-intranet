import { Link } from "react-router-dom";
import styles from "../components/News/News.module.css";

const NewsPage = () => {
    return (
        <div>
            <h1>News</h1>
            <p>This is the news page.</p>
            <Link to="/news/create" className={styles.createButton}>
                Skapa nyhet
            </Link>
        </div>
    );
};

export default NewsPage;
