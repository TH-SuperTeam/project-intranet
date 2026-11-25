import { Megaphone } from "lucide-react"
import { usePublicNews } from "../../hooks/NewsHooks/usePublicNews"
import styles from "./Widgets.module.css"
import NewsImage from "../common/NewsImage"
import { ListSkeleton } from "../Loaders/Skeletons/ListSkeleton"
import ErrorState from "../errors/ErrorState"

const PublicNewsWidget = () => {
  const { data: news, isPending, isError } = usePublicNews()

  if (isPending) {
    return <ListSkeleton variant="news" count={1} />
  }

  if (isError) {
    return (
      <section className={styles.infoWidget}>
        <ErrorState resource="nyheterna" />
      </section>
    )
  }

  return (
    <section className={`${styles.infoWidget} ${styles.publicNewsWidget}`}>
      <div className={styles.infoWidgetHeader}>
        <Megaphone size={24} />
        <h2>Aktuellt på skolan</h2>
      </div>

      {news.content.length === 0 ? (
        <p className={styles.emptyState}>Det finns inga aktuella nyheter just nu.</p>
      ) : (
        <ul className={styles.newsList}>
          {news.content.slice(0, 2).map((item) => (
            <li key={item.id} className={styles.publicNewsItem}>
              <NewsImage src={item.newsImageUrl} className={styles.newsWidgetImage} />
              <div className={styles.newsContent}>
                <h3>{item.title}</h3>

                <p>{item.content}</p>

                <time dateTime={item.createdAt}>
                  {new Date(item.createdAt).toLocaleDateString("sv-SE", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default PublicNewsWidget
