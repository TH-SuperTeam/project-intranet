import type { News } from "../../types/News";

interface NewsCardProps {
    news: News;
}

const NewsCard = ({ news }: NewsCardProps) => {
    return (
        <li>
            <h2>{news.title}</h2>
            <p>{news.content}</p>
            <p>{news.createdAt}</p>
        </li>
    );
};

export default NewsCard;
