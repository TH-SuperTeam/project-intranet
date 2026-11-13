import { UserRound } from "lucide-react"

import { AVATAR_IDS, getAvatarDataUri } from "../../utils/avatarUtils"

import type { AvatarId } from "../../utils/avatarUtils"

import styles from "./AvatarPicker.module.css"

interface AvatarPickerProps {
  selectedAvatarId: AvatarId | null
  onSelect: (avatarId: AvatarId | null) => void
}

const AvatarPicker = ({ selectedAvatarId, onSelect }: AvatarPickerProps) => {
  return (
    <section className={styles.avatarPicker}>
      <h4>Välj profilbild</h4>

      <p className={styles.description}>Välj en avatar eller använd standardikonen.</p>

      <div className={styles.avatarGrid}>
        {AVATAR_IDS.map((avatarId) => (
          <button
            key={avatarId}
            type="button"
            className={`${styles.avatarOption} ${selectedAvatarId === avatarId ? styles.selected : ""}`}
            onClick={() => onSelect(avatarId)}
            aria-label={`Välj ${avatarId}`}
            aria-pressed={selectedAvatarId === avatarId}>
            <img src={getAvatarDataUri(avatarId)} alt="" className={styles.avatarImage} />
          </button>
        ))}

        <button
          type="button"
          className={`${styles.avatarOption} ${selectedAvatarId === null ? styles.selected : ""}`}
          onClick={() => onSelect(null)}
          aria-label="Välj ingen avatar"
          aria-pressed={selectedAvatarId === null}>
          <UserRound size={38} />
          <span>Ingen avatar</span>
        </button>
      </div>
    </section>
  )
}

export default AvatarPicker
