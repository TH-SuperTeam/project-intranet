import Skeleton from "react-loading-skeleton"

import styles from "./ProfileSkeleton.module.css"

export const ProfileSkeleton = () => {
  return (
    <section className={styles.profilePage}>
      <header className={styles.pageHeader}>
        <Skeleton width={180} height={30} />
        <Skeleton width={290} height={16} />
      </header>

      <div className={styles.profileHeader}>
        <div className={styles.avatarSection}>
          <Skeleton circle width={130} height={130} />
        </div>

        <div className={styles.profileInfo}>
          <Skeleton width={200} height={28} />
          <Skeleton width={85} height={26} borderRadius={20} />
        </div>
      </div>

      <div className={styles.profileContent}>
        <div className={styles.profileCard}>
          <Skeleton width={100} height={22} />
          <div style={{ marginTop: "1.25rem" }}>
            <Skeleton count={3} height={14} />
          </div>
        </div>

        <div className={styles.profileCard}>
          <div className={styles.cardHeader}>
            <Skeleton width={145} height={22} />
          </div>

          <div className={styles.accountInfo}>
            {[1, 2, 3].map((item) => (
              <div key={item} className={styles.accountInfoItem}>
                <Skeleton circle width={20} height={20} />
                <div style={{ flex: 1 }}>
                  <Skeleton width={100} height={13} />
                  <Skeleton width={160} height={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
