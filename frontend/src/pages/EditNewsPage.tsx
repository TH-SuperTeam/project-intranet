import { useParams } from "react-router-dom"
import BackLink from "../components/common/BackLink"
import styles from "../components/News/NewsForm.module.css"
import EditNewsForm from "../components/News/EditNewsForm"
import { useNewsById } from "../hooks/NewsHooks/useNewsById"
import { useAudience } from "../hooks/useAudience"
import { PacmanSpinner } from "../components/Loaders/Spinners/PacmanSpinner"
import ErrorState from "../components/errors/ErrorState"

const EditNewsPage = () => {
  // Hämtar nyhetens ID från URL:en, exempelvis /news/5/edit
  const { id } = useParams()
  const newsId = Number(id)
  const { audience } = useAudience()

  // Hämtar nyheten som ska redigeras
  const { data: news, isLoading, isError } = useNewsById(newsId, audience)

  if (!id || !Number.isSafeInteger(newsId) || newsId <= 0) {
    return <p>Ogiltigt nyhets-ID.</p>
  }

  if (isLoading) {
    return <PacmanSpinner />
  }

  if (isError) {
    return <ErrorState resource="nyheten" />
  }

  if (!news) {
    return <p>Nyheten hittades inte.</p>
  }

  return (
    <div className={styles.container}>
      <BackLink to={`/news/${news.id}`} />

      <h1 className={styles.title}>Redigera nyhet</h1>

      <EditNewsForm key={news.id} news={news} />
    </div>
  )
}

export default EditNewsPage
