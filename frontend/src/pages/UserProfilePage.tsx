
import { Link, useParams } from "react-router-dom";
import UserProfileCard from "../components/Users/UserProfileCard";
import { useUserProfile } from "../hooks/UsersHooks/useUserProfile";
import styles from "./UserProfilePage.module.css";

const UserProfilePage = () => {
    const { id } = useParams<{ id: string }>();
    const userId = Number(id);

    const isValidId =
        id !== undefined &&
        Number.isInteger(userId) &&
        userId > 0;

    const {
        data: profile,
        isLoading,
        isError,
        error,
    } = useUserProfile(userId);

    if (!isValidId) {
        return (
            <section className={styles.profilePage}>
                <p className={styles.errorMessage}>
                    Ogiltigt användar-ID.
                </p>
                <Link to="/users">Tillbaka till användare</Link>
            </section>
        );
    }

    if (isLoading) {
        return (
            <section className={styles.profilePage}>
                <p>Laddar profil...</p>
            </section>
        );
    }

    if (isError || !profile) {
        const isNotFound =
            error instanceof Error &&
            error.message === "Användaren kunde inte hittas.";

        return (
            <section className={styles.profilePage}>
                <p className={styles.errorMessage}>
                    {isNotFound
                        ? "Användaren kunde inte hittas."
                        : "Kunde inte hämta profilen. Försök igen senare."}
                </p>

                <Link to="/users">
                    Tillbaka till användare
                </Link>
            </section>
        );
    }

    return (
        <section className={styles.profilePage}>
            <Link to="/users" className={styles.backLink}>
                ← Tillbaka till användare
            </Link>

            <h1>Användarprofil</h1>

            <UserProfileCard profile={profile} />
        </section>
    );
};

export default UserProfilePage;
