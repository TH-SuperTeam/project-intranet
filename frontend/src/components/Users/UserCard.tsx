import { Link } from "react-router-dom";
import styles from "./Users.module.css";
import type { User } from "../../types/User";

interface UserCardProps {
    user: User;
}

const UserCard = ({ user }: UserCardProps) => {
    return (
        <li className={styles.newsCard}>
            <div className={styles.cardHeader}>
                <h2 className={styles.title}>
                    {user.firstName} {user.lastName}
                </h2>
            </div>

            <p className={styles.content}>{user.email}</p>
            <p className={styles.content}>{user.userType}</p>
            <p className={styles.content}>{user.status}</p>
        </li>
    );
};

export default UserCard;
