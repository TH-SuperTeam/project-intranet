import { Avatar, Style } from "@dicebear/core"
import moods from "@dicebear/styles/moods.json" with { type: "json" }

// De 12 avatarer som användaren kan välja mellan
export const AVATAR_IDS = [
  "avatar-01",
  "avatar-02",
  "avatar-03",
  "avatar-04",
  "avatar-05",
  "avatar-06",
  "avatar-07",
  "avatar-08",
  "avatar-09",
  "avatar-10",
  "avatar-11",
  "avatar-12",
] as const

export type AvatarId = (typeof AVATAR_IDS)[number]

// Genererar en avatar baserat på dess ID
export const getAvatarDataUri = (avatarId: AvatarId): string => {
  const avatar = new Avatar(new Style(moods), {
    seed: avatarId,
    size: 128,
  })

  return avatar.toDataUri()
}
