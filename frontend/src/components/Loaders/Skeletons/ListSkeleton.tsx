import Skeleton from "react-loading-skeleton"
import styles from "./ListSkeleton.module.css"

type ListSkeletonProps = {
  variant?: "news" | "user" | "list"

  count?: number
}

export const ListSkeleton = ({ variant = "news", count = 3 }: ListSkeletonProps) => {
  return (
    <ul className={`${styles.list} ${variant === "user" ? styles.userList : styles.newsList}`} aria-hidden="true">
      {Array.from({ length: count }, (_, index) =>
        variant === "list" ? (
          <li className={`${styles.card} ${styles.listCard}`} key={index}>
            <Skeleton width="45%" />
            <Skeleton width="80%" />
          </li>
        ) : variant === "user" ? (
          <li className={`${styles.card} ${styles.userCard}`} key={index}>
            <Skeleton circle width={44} height={44} />
            <div className={styles.userInfo}>
              <h3 className={styles.userName}>
                <Skeleton />
              </h3>
              <p className={styles.userEmail}>
                <Skeleton width="75%" />
              </p>
              <span className={styles.userType}>
                <Skeleton width={64} />
              </span>
            </div>
            <div className={styles.userBadge}>
              <Skeleton width={72} />
            </div>
          </li>
        ) : (
          <li className={`${styles.card} ${styles.newsCard}`} key={index}>
            <div className={styles.newsHeader}>
              <h2 className={styles.newsTitle}>
                <Skeleton />
              </h2>
              <span className={styles.newsDate}>
                <Skeleton width={76} />
              </span>
            </div>
            <p className={styles.newsContent}>
              <Skeleton count={3} />
            </p>
            <span className={styles.readMore}>
              <Skeleton width={74} />
            </span>
          </li>
        ),
      )}
    </ul>
  )
}
