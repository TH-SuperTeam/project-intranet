import { useUsers } from "../../hooks/UsersHooks/useUsers";
import UserCard from "./UserCard";
import styles from "./Users.module.css";

const UsersList = () => {
    const { data: users, isPending, isError } = useUsers();

    if (isPending) {
        return <div className={styles.state}>Laddar användare...</div>;
    }

    if (isError) {
        return (
            <div className={styles.errorState} role="alert">
                Det gick inte att ladda användarna.
            </div>
        );
    }

    if (users.length === 0) {
        return (
            <div className={styles.emptyState}>
                <h3>Inga användare att visa</h3>
                <p>Det finns inga registrerade användare.</p>
            </div>
        );
    }

    return (
        <ul className={styles.newsList}>
            {users.map(users => (
                <UserCard key={users.id} user={users} />
            ))}
        </ul>
    );
};

export default UsersList;
