import { Link, useLocation } from "react-router-dom"
import type { News } from "../../types/News"
import styles from "./News.module.css"
import NewsImage from "../common/NewsImage"

interface NewsCardProps {
  news: News
}

const NewsCard = ({ news }: NewsCardProps) => {
  const location = useLocation()

  const formattedDate = new Date(news.createdAt).toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <li className={styles.newsCard}>
      <NewsImage src={news.newsImageUrl} className={styles.newsImage} />
      <div className={styles.newsInfo}>
        <div className={styles.cardHeader}>
          <h2 className={styles.title}>{news.title}</h2>

          <time dateTime={news.createdAt} className={styles.date}>
            {formattedDate}
          </time>
        </div>

        <p className={styles.content}>{news.content}</p>
        <Link 
          to={`/news/${news.id}`}
          state={{ from: location.pathname + location.search }}
          className={styles.readMore}>
          Läs mer...
        </Link>
      </div>
    </li>
  )
}

export default NewsCard
