import { House } from "lucide-react"
import { Link } from "react-router-dom"
import Logo from "../../components/common/Logo"
import styles from "./NotFoundPage.module.css"

const NotFoundPage = () => {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <Logo variant="horizontal" className={styles.logo} />

        <section className={styles.message} aria-labelledby="not-found-title">
          <p className={styles.code}>404</p>
          <h1 id="not-found-title">Här verkar du ha gått vilse</h1>
          <p className={styles.description}>Sidan du letar efter finns inte eller har flyttats.</p>

          <Link to="/" className={styles.homeLink}>
            <House aria-hidden="true" />
            <span>Till startsidan</span>
          </Link>
        </section>
      </div>
    </main>
  )
}

export default NotFoundPage
