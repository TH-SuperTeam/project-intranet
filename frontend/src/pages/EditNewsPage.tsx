import { useParams } from "react-router-dom";
import BackLink from "../components/common/BackLink";
import styles from "../components/CreateNews/CreateNews.module.css";
import EditNewsForm from "../components/CreateNews/EditNewsForm";
import { useNewsById } from "../hooks/useNewsById";

const EditNewsPage = () => {
    // Hämtar nyhetens ID från URL:en, exempelvis /news/5/edit
    const { id } = useParams();
    const newsId = Number(id);

    // Hämtar nyheten som ska redigeras
    const { data: news, isLoading, isError } = useNewsById(newsId);

    if (!id || !Number.isSafeInteger(newsId) || newsId <= 0) {
        return <p>Ogiltigt nyhets-ID.</p>;
    }

    if (isLoading) {
        return <p>Laddar nyheten...</p>;
    }

    if (isError) {
        return <p>Kunde inte hämta nyheten.</p>;
    }

    if (!news) {
        return <p>Nyheten hittades inte.</p>;
    }

    return (
        <div className={styles.container}>
            <BackLink to={`/news/${news.id}`} />

            <h1 className={styles.title}>Redigera nyhet</h1>

            <EditNewsForm key={news.id} news={news} />
        </div>
    );
};

export default EditNewsPage;
