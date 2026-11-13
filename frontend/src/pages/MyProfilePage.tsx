import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { UserRound, Mail, CalendarDays, ShieldCheck, Pencil } from "lucide-react"

import { useMyProfile } from "../hooks/useMyProfile"
import useUpdateMyProfile from "../hooks/UsersHooks/useUpdateMyProfile"
import type { UpdateProfileRequest } from "../types/UpdateProfileRequest"
import { UserType } from "../types/UserType"
import { AccessRole } from "../types/AccessRole"
import AvatarPicker from "../components/common/AvatarPicker"
import { AVATAR_IDS, getAvatarDataUri } from "../utils/avatarUtils"
import type { AvatarId } from "../utils/avatarUtils"
import styles from "./MyProfilePage.module.css"

const userTypeLabels: Record<UserType, string> = {
  [UserType.TEACHER]: "Personal",
  [UserType.STUDENT]: "Student",
}

const MyProfilePage = () => {
  const { data: profile, isLoading, isError } = useMyProfile()
  const updateProfile = useUpdateMyProfile()

  const [isEditing, setIsEditing] = useState(false)
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)
  const [selectedAvatarId, setSelectedAvatarId] = useState<AvatarId | null>(null)

  const [formData, setFormData] = useState<UpdateProfileRequest>({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    profileImageUrl: null,
  })

  const handleEdit = () => {
    if (!profile) return

    setFormData({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      bio: profile.bio,
      profileImageUrl: profile.profileImageUrl,
    })

    const savedAvatar = AVATAR_IDS.find((avatarId) => profile.profileImageUrl === `dicebear:${avatarId}`) ?? null

    setSelectedAvatarId(savedAvatar)
    setShowAvatarPicker(false)

    updateProfile.reset()
    setIsEditing(true)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    updateProfile.mutate(
      {
        ...formData,
        bio: formData.bio?.trim() || null,
        profileImageUrl: selectedAvatarId ? `dicebear:${selectedAvatarId}` : null,
      },
      {
        onSuccess: () => {
          setIsEditing(false)
          setShowAvatarPicker(false)
        },
      },
    )
  }

  const handleCancel = () => {
    setIsEditing(false)
    setShowAvatarPicker(false)
    setSelectedAvatarId(null)
    updateProfile.reset()
  }

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

  const displayedAvatarId = isEditing
    ? selectedAvatarId
    : (AVATAR_IDS.find((avatarId) => profile.profileImageUrl === `dicebear:${avatarId}`) ?? null)

  const hasExistingImage =
    !isEditing && profile.profileImageUrl !== null && !profile.profileImageUrl.startsWith("dicebear:")

  return (
    <section className={styles.profilePage}>
      <header className={styles.pageHeader}>
        <h1>Min profil</h1>
        <p>Här kan du se dina profil- och kontouppgifter.</p>
      </header>

      {/* Profile header */}
      <div className={styles.profileHeader}>
        <div className={styles.avatarSection}>
          {displayedAvatarId ? (
            <img
              src={getAvatarDataUri(displayedAvatarId)}
              alt={`${profile.firstName} ${profile.lastName}`}
              className={styles.profileImage}
            />
          ) : hasExistingImage ? (
            <img
              src={profile.profileImageUrl!}
              alt={`${profile.firstName} ${profile.lastName}`}
              className={styles.profileImage}
            />
          ) : (
            <div className={styles.profileImagePlaceholder}>
              <UserRound size={48} />
            </div>
          )}

          {isEditing && (
            <button
              type="button"
              className={styles.avatarButton}
              onClick={() => setShowAvatarPicker((previous) => !previous)}>
              <Pencil size={16} />
              {showAvatarPicker ? "Dölj avatarer" : "Byt profilbild"}
            </button>
          )}
        </div>

        <div className={styles.profileInfo}>
          <h2>
            {profile.firstName} {profile.lastName}
          </h2>

          <span className={styles.userType}>{userTypeLabels[profile.userType]}</span>
        </div>

        {!isEditing && (
          <button type="button" className={styles.editButton} onClick={handleEdit}>
            <Pencil size={17} />
            Redigera profil
          </button>
        )}
      </div>

      {isEditing ? (
        /* Edit profile */
        <div className={styles.profileCard}>
          <h3>Redigera profiluppgifter</h3>

          <form className={styles.editForm} onSubmit={handleSubmit}>
            {showAvatarPicker && <AvatarPicker selectedAvatarId={selectedAvatarId} onSelect={setSelectedAvatarId} />}

            <label className={styles.formField}>
              Förnamn
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </label>

            <label className={styles.formField}>
              Efternamn
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </label>

            <label className={styles.formField}>
              E-postadress
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>

            <label className={styles.formField}>
              Biografi
              <textarea name="bio" value={formData.bio ?? ""} onChange={handleChange} maxLength={500} rows={5} />
            </label>

            {updateProfile.isError && <div className={styles.errorMessage}>{updateProfile.error.message}</div>}

            <div className={styles.formActions}>
              <button type="submit" className={styles.saveButton} disabled={updateProfile.isPending}>
                {updateProfile.isPending ? "Sparar..." : "Spara ändringar"}
              </button>

              <button type="button" className={styles.cancelButton} onClick={handleCancel}>
                Avbryt
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Profile content */
        <div className={styles.profileContent}>
          <div className={styles.profileCard}>
            <h3>Om mig</h3>

            <p className={styles.bio}>{profile.bio || "Berätta lite om dig själv."}</p>
          </div>

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
      )}
    </section>
  )
}

export default MyProfilePage
