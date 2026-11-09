import { useUsers } from "../../hooks/UsersHooks/useUsers";
import UserCard from "./UserCard";
import styles from "./Users.module.css";

interface UserListProps {
    search: string;
}

const UsersList = ({ search }: UserListProps) => {
    const { data: users, isPending, isError } = useUsers(search);

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
        const hasSearch = search.trim().length > 0;

        return (
            <div className={styles.emptyState}>
                <h3>
                    {hasSearch
                        ? "Inga matchande användare"
                        : "Inga användare att visa"}
                </h3>
                <p>
                    {hasSearch
                        ? "Det finns inga användare som matchar din sökning."
                        : "Det finns inga användare att visa just nu."}
                </p>
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
