import { Link } from "react-router-dom"
import styles from "./Users.module.css"
import type { User } from "../../types/User"
import { Status } from "../../types/Status"
import type { PublicUser } from "../../types/PublicUser"
import { useAuth } from "../../hooks/useAuth"
import UserAvatar from "../common/UserAvatar"
import UserBadges from "../common/UserBadges"
import CopyEmailButton from "../common/CopyEmailButton"

interface UserCardProps {
	user: User | PublicUser
}

const statusLabels: Record<Status, string> = {
	[Status.ACTIVE]: "Aktiv",
	[Status.SUSPENDED]: "Avstängd",
	[Status.GRADUATED]: "Examinerad",
	[Status.WITHDRAWN]: "Avbruten",
	[Status.TERMINATED]: "Avslutad",
	[Status.ON_LEAVE]: "Tjänstledig",
	[Status.PAUSED]: "Pausad",
}

const UserCard = ({ user }: UserCardProps) => {
	const { user: currentUser } = useAuth()

	const isAdmin = currentUser?.accessRole === "ADMIN"
	const isOwnProfile = currentUser?.id === user.id
	const profilePath = isOwnProfile ? "/profile" : `/users/${user.id}`

	const userStatus = "status" in user ? user.status : undefined

	return (
		<li className={styles.userCard}>
			<div className={styles.userInfoContainer}>
				<Link to={profilePath} className={styles.userProfileLink}>
					<UserAvatar
						size={48}
						profileImageUrl={user.profileImageUrl}
					/>

					<div className={styles.userInfo}>
						<h3 className={styles.userName}>
							{user.firstName} {user.lastName}
						</h3>

						<UserBadges
							userType={user.userType}
							school={user.school}
							programName={user.programName}
							className={user.className}
						/>
					</div>
				</Link>

				<div className={styles.emailRow}>
					<span className={styles.userEmail}>{user.email}</span>
					<CopyEmailButton email={user.email} />
				</div>
			</div>

			<div className={styles.userBadges}>
				{"accessRole" in user && user.accessRole === "ADMIN" && (
					<span className={styles.adminBadge}>Admin</span>
				)}

				{isAdmin && userStatus && (
					<span
						className={`${styles.statusBadge} ${
							userStatus === Status.ACTIVE
								? styles.statusActive
								: styles.statusInactive
						}`}
					>
						{statusLabels[userStatus]}
					</span>
				)}
			</div>
		</li>
	)
}

export default UserCard
