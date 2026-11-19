import type { PublicUser } from "../../types/PublicUser";
import type { User } from "../../types/User";
import UserCard from "./UserCard";
import styles from "./Users.module.css";

interface UserListProps {
    users: (User | PublicUser)[];
    isPending: boolean;
    isError: boolean;
    hasActiveFilters: boolean;
    onReset: () => void;
}

const UsersList = ({
    users,
    isPending,
    isError,
    hasActiveFilters,
    onReset,
}: UserListProps) => {
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
                <h3>
                    {hasActiveFilters
                        ? "Inga matchande användare"
                        : "Inga användare att visa"}
                </h3>
                <p>
                    {hasActiveFilters
                        ? "Det finns inga användare som matchar din sökning."
                        : "Det finns inga användare att visa just nu."}
                </p>
                {hasActiveFilters && (
                    <button type="button" onClick={onReset}>
                        Rensa filter
                    </button>
                )}
            </div>
        );
    }

    return (
        <ul className={styles.usersList}>
            {users.map(user => (
                <UserCard key={user.id} user={user} />
            ))}
        </ul>
    );
};

export default UsersList;
