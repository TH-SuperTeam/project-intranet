import { useParams } from "react-router-dom"
import styles from "../components/News/News.module.css"
import NewsDetails from "../components/News/NewsDetails"
import { useAudience } from "../hooks/useAudience"
import { useNewsById } from "../hooks/NewsHooks/useNewsById"
import { ListSkeleton } from "../components/Loaders/Skeletons/ListSkeleton"

const NewsDetailsPage = () => {
  // useParams returns the :id from the URL, always as a string (or undefined)
  const { id } = useParams()
  const { audience } = useAudience()

  // Converted to a number so it can be compared with user.id (a number).
  // Something like /users/abc becomes NaN, which matches no user and is handled below
  const newsId = Number(id)

  const { data: news, isPending, isError } = useNewsById(newsId, audience)

  if (isPending)
    return (
      <div className={styles.newsDetails}>
        <div className={`${styles.detailsCard} ${styles.detailsSkeleton}`}>
          <ListSkeleton variant="news" count={1} />
        </div>
      </div>
    )

  if (isError)
    return (
      <p className={styles.errorState} role="alert">
        Gick inte att hämta nyhet.
      </p>
    )

  return <NewsDetails news={news} />
}

export default NewsDetailsPage
