import { Link } from "react-router-dom"
import { useState } from "react"
import styles from "./Users.module.css"
import type { User } from "../../types/User"
import { Status } from "../../types/Status"
import { UserType } from "../../types/UserType"
import UserStatusSelect from "./UserStatus/UserStatusSelect"
import StatusConfirmDialog from "./UserStatus/StatusConfirmDialog"
import useUpdateUserStatus from "../../hooks/UsersHooks/useUpdateUserStatus"
import type { PublicUser } from "../../types/PublicUser"
import { useAuth } from "../../hooks/useAuth"
import UserAvatar from "../common/UserAvatar"

interface UserCardProps {
  user: User | PublicUser
  onStatusFeedback: (message: string, type: "success" | "error") => void
}

const userTypeLabels: Record<UserType, string> = {
  [UserType.TEACHER]: "Lärare",
  [UserType.STUDENT]: "Student",
}

const UserCard = ({ user, onStatusFeedback }: UserCardProps) => {
  const { user: currentUser } = useAuth()
  const isAdmin = currentUser?.accessRole === "ADMIN"

  const isOwnProfile = currentUser?.id === user.id
  const profilePath = isOwnProfile ? "/profile" : `/users/${user.id}`

  const userStatus = "status" in user ? user.status : undefined
  const [selectedStatus, setSelectedStatus] = useState<Status>(userStatus ?? Status.ACTIVE)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const updateStatusMutation = useUpdateUserStatus()

  const handleStatusChange = (status: Status) => {
    if (!isAdmin || status === userStatus) {
      return
    }

    setSelectedStatus(status)
    setShowConfirmDialog(true)
  }

  const handleCancel = () => {
    if (userStatus) {
      setSelectedStatus(userStatus)
    }
    setShowConfirmDialog(false)
  }

  const handleConfirm = () => {
    updateStatusMutation.mutate(
      {
        userId: user.id,
        status: selectedStatus,
      },
      {
        onSuccess: () => {
          setShowConfirmDialog(false)

          onStatusFeedback(`Statusen för ${user.firstName} ${user.lastName} har uppdaterats.`, "success")
        },
        onError: (error) => {
          if (userStatus) {
            setSelectedStatus(userStatus)
          }
          setShowConfirmDialog(false)

          onStatusFeedback(
            error instanceof TypeError ? "Kunde inte ansluta till servern. Försök igen." : error.message,
            "error",
          )
        },
      },
    )
  }

  return (
    <li className={styles.userCard}>
      <Link to={profilePath} className={styles.userProfileLink}>
        <UserAvatar size={48} profileImageUrl={user.profileImageUrl} />

        <div className={styles.userInfo}>
          <h3 className={styles.userName}>
            {user.firstName} {user.lastName}
          </h3>

          <p className={styles.userEmail}>{user.email}</p>

          <span className={styles.userType}>{userTypeLabels[user.userType]}</span>
        </div>
      </Link>

      {isAdmin && (
        <div className={styles.statusControl}>
          <UserStatusSelect
            value={selectedStatus}
            onChange={handleStatusChange}
            disabled={updateStatusMutation.isPending}
          />
        </div>
      )}

      {isAdmin && showConfirmDialog && (
        <StatusConfirmDialog
          userName={`${user.firstName} ${user.lastName}`}
          currentStatus={userStatus ?? Status.ACTIVE}
          newStatus={selectedStatus}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          isPending={updateStatusMutation.isPending}
        />
      )}
    </li>
  )
}

export default UserCard
