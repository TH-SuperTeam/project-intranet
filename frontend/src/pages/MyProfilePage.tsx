import { UserRound, Mail, CalendarDays, ShieldCheck } from "lucide-react"
import { useMyProfile } from "../hooks/useMyProfile"
import { UserType } from "../types/UserType"
import { AccessRole } from "../types/AccessRole"
import styles from "./MyProfilePage.module.css"

const userTypeLabels: Record<UserType, string> = {
  [UserType.TEACHER]: "Personal",
  [UserType.STUDENT]: "Student",
}

const MyProfilePage = () => {
  const { data: profile, isLoading, isError } = useMyProfile()

  if (isLoading) {
    return <p>Laddar din profil...</p>
  }

  if (isError || !profile) {
    return (
      <section className={styles.profilePage}>
        <div className={styles.errorMessage}>Kunde inte hämta din profil. Försök igen senare.</div>
      </section>
    )
  }

  const createdAt = new Date(profile.createdAt).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <section className={styles.profilePage}>
      <header className={styles.pageHeader}>
        <h1>Min profil</h1>
        <p>Här kan du se dina profil- och kontouppgifter.</p>
      </header>

      {/* Profile header */}
      <div className={styles.profileHeader}>
        {profile.profileImageUrl ? (
          <img
            src={profile.profileImageUrl}
            alt={`${profile.firstName} ${profile.lastName}`}
            className={styles.profileImage}
          />
        ) : (
          <div className={styles.profileImagePlaceholder}>
            <UserRound size={48} />
          </div>
        )}

        <div className={styles.profileInfo}>
          <h2>
            {profile.firstName} {profile.lastName}
          </h2>

          <span className={styles.userType}>{userTypeLabels[profile.userType]}</span>
        </div>
      </div>

      {/* Profile content */}
      <div className={styles.profileContent}>
        {/* About me */}
        <div className={styles.profileCard}>
          <h3>Om mig</h3>

          <p className={styles.bio}>{profile.bio || "Berätta lite om dig själv."}</p>
        </div>

        {/* Account information */}
        <div className={styles.profileCard}>
          <h3>Kontouppgifter</h3>

          <div className={styles.accountInfo}>
            <div className={styles.accountInfoItem}>
              <Mail size={19} />
              <div>
                <span>E-postadress</span>
                <p>{profile.email}</p>
              </div>
            </div>

            <div className={styles.accountInfoItem}>
              <CalendarDays size={19} />
              <div>
                <span>Kontot skapades</span>
                <p>{createdAt}</p>
              </div>
            </div>

            {profile.accessRole === AccessRole.ADMIN && (
              <div className={styles.accountInfoItem}>
                <ShieldCheck size={19} />
                <div>
                  <span>Behörighetsroll</span>
                  <p>Administratör</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyProfilePage
