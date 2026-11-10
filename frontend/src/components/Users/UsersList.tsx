
import { useEffect, useState } from "react";
import { useUsers } from "../../hooks/UsersHooks/useUsers";
import UserCard from "./UserCard";
import styles from "./Users.module.css";

interface UserListProps {
    search: string;
}

const UsersList = ({ search }: UserListProps) => {
    const { data: users, isPending, isError } = useUsers(search);

    const [feedback, setFeedback] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);

    useEffect(() => {
        if (!feedback) return;

        const timer = setTimeout(() => {
            setFeedback(null);
        }, 4000);

        return () => clearTimeout(timer);
    }, [feedback]);

    const handleStatusFeedback = (
        message: string,
        type: "success" | "error",
    ) => {
        setFeedback({ message, type });
    };

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
        <>
            {feedback && (
                <div
                    role={feedback.type === "error" ? "alert" : "status"}
                    className={`mb-4 rounded-lg border px-4 py-3 text-sm ${
                        feedback.type === "success"
                            ? "border-green-200 bg-green-50 text-green-800"
                            : "border-red-200 bg-red-50 text-red-800"
                    }`}
                >
                    {feedback.message}
                </div>
            )}

            <ul className={styles.usersList}>
                {users.map(user => (
                    <UserCard
                        key={user.id}
                        user={user}
                        onStatusFeedback={handleStatusFeedback}
                    />
                ))}
            </ul>
        </>
    );
};

export default UsersList;
