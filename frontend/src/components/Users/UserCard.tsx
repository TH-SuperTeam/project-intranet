import styles from "./Users.module.css";
import type { User } from "../../types/User";
import { Status } from "../../types/Status";
import { UserType } from "../../types/UserType";

interface UserCardProps {
    user: User;
}

const userTypeLabels: Record<UserType, string> = {
    [UserType.TEACHER]: "Lärare",
    [UserType.STUDENT]: "Student",
};

const statusLabels: Record<Status, string> = {
    [Status.ACTIVE]: "Aktiv",
    [Status.SUSPENDED]: "Avstängd",
    [Status.GRADUATED]: "Examinerad",
    [Status.WITHDRAWN]: "Avbruten",
    [Status.TERMINATED]: "Avslutad",
    [Status.ON_LEAVE]: "Tjänstledig",
    [Status.PAUSED]: "Pausad",
};

const UserCard = ({ user }: UserCardProps) => {
    const initials =
        `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

    const isActive = user.status === Status.ACTIVE;

    return (
        <li className={styles.userCard}>
            <div className={styles.avatar}>{initials}</div>

            <div className={styles.userInfo}>
                <h3 className={styles.userName}>
                    {user.firstName} {user.lastName}
                </h3>

                <p className={styles.userEmail}>{user.email}</p>

                <span className={styles.userType}>
                    {userTypeLabels[user.userType]}
                </span>
            </div>

            <span
                className={`${styles.statusBadge} ${
                    isActive ? styles.statusActive : styles.statusInactive
                }`}
            >
                {statusLabels[user.status]}
            </span>
        </li>
    );
};

export default UserCard;
