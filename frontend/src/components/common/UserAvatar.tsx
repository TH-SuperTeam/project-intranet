import { useState } from "react"
import { UserRound } from "lucide-react"
import { AVATAR_IDS, getAvatarDataUri, type AvatarId } from "../../utils/avatarUtils"

interface UserAvatarProps {
  size?: number
  profileImageUrl?: string | null
}

const UserAvatar = ({ size = 48, profileImageUrl }: UserAvatarProps) => {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null)

  const isDiceBearAvatar = profileImageUrl?.startsWith("dicebear:") ?? false

  const avatarId = isDiceBearAvatar ? profileImageUrl!.replace("dicebear:", "") : null

  const isValidAvatar = avatarId !== null && AVATAR_IDS.includes(avatarId as AvatarId)

  const imageSrc = isValidAvatar ? getAvatarDataUri(avatarId as AvatarId) : !isDiceBearAvatar ? profileImageUrl : null

  const showImage = !!imageSrc && failedImageUrl !== imageSrc

  return (
    <div
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-(--color-primary-light) bg-(--color-secondary-soft) text-(--color-primary)"
      style={{ width: size, height: size }}>
      {showImage ? (
        <img src={imageSrc} alt="" className="h-full w-full object-cover" onError={() => setFailedImageUrl(imageSrc)} />
      ) : (
        <UserRound size={size * 0.65} strokeWidth={2} aria-hidden="true" />
      )}
    </div>
  )
}

export default UserAvatar
