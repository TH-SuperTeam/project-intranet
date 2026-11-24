import Skeleton from "react-loading-skeleton"
import styles from "./ScheduleSkeleton.module.css"

const ScheduleSkeleton = () => (
  <div className={styles.skeleton} role="status" aria-label="Hämtar schema">
    <span className={styles.screenReaderText}>Hämtar schema…</span>
    <div className={styles.filters} aria-hidden="true">
      <Skeleton width={110} height={42} />
      <Skeleton width={110} height={42} />
      <Skeleton width={210} height={48} />
      <Skeleton width={210} height={48} />
    </div>
    <div className={styles.lessons} aria-hidden="true">
      {Array.from({ length: 6 }, (_, index) => (
        <div className={styles.lesson} key={index}>
          <Skeleton width="65%" height={20} />
          <Skeleton width="45%" />
          <Skeleton width="75%" />
        </div>
      ))}
    </div>
  </div>
)

export default ScheduleSkeleton
