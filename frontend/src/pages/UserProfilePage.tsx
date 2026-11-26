import { useParams } from "react-router-dom"
import UserProfileCard from "../components/Users/UserProfileCard"
import { useUserProfile } from "../hooks/UsersHooks/useUserProfile"
import styles from "./UserProfilePage.module.css"
import BackLink from "../components/common/BackLink"
import { ProfileSkeleton } from "../components/Loaders/Skeletons/ProfileSkeleton"
import ErrorState from "../components/errors/ErrorState"

const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>()
  const userId = Number(id)

  const { data: profile, isLoading, isError, error } = useUserProfile(userId)

  if (isLoading) {
    return <ProfileSkeleton />
  }

  if (isError || !profile) {
    const isNotFound = error instanceof Error && error.message === "Användaren kunde inte hittas."

    return (
      <section className={styles.profilePage}>
        <p className={styles.errorMessage}>
          {isNotFound ? "Användaren kunde inte hittas." : <ErrorState resource="profilen" />}
        </p>
      </section>
    )
  }

  return (
    <section className={styles.profilePage}>
      <BackLink to="/users" label="Tillbaka till användare" />

      <h1>Användarprofil</h1>

      <UserProfileCard profile={profile} />
    </section>
  )
}

export default UserProfilePage
