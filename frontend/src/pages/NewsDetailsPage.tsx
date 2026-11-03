import { useParams } from "react-router-dom";
import { useNews } from "../hooks/useNews";
import styles from "../components/News/News.module.css";
import NewsDetails from "../components/News/NewsDetails";
import { useAudience } from "../hooks/useAudience";

const NewsDetailsPage = () => {
    // useParams returns the :id from the URL, always as a string (or undefined)
    const { id } = useParams();
    const { audience } = useAudience();

    // Converted to a number so it can be compared with user.id (a number).
    // Something like /users/abc becomes NaN, which matches no user and is handled below
    const newsId = Number(id);

    const { data: news, isPending, isError } = useNews({ audience });

    if (isPending) return <p className={styles.state}>Laddar nyhet...</p>;

    if (isError)
        return (
            <p className={styles.errorState} role="alert">
                Gick inte att hämta nyhet.
            </p>
        );

    // find returns undefined if no news has that id (e.g. /news/999)
    const findNews = news.find(n => n.id === newsId);
    if (!findNews)
        return (
            <div>
                <p>Nyheten hittades inte.</p>
            </div>
        );

    return (
        <>
            <NewsDetails news={findNews}></NewsDetails>
        </>
    );
};

export default NewsDetailsPage;
