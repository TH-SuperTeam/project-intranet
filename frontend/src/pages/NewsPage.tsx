import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../components/News/News.module.css";
import NewsList from "../components/News/NewsList";
import { TargetAudience } from "../types/TargetAudience";
import { useAudience } from "../hooks/useAudience";
import type { MockRole } from "../contexts/AudienceContext";
import { useEffect, useState } from "react";

const NewsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [successMessage] = useState<string>(
        () => location.state?.successMessage ?? "",
    );

    useEffect(() => {
        if (location.state?.successMessage) {
            navigate(location.pathname, {
                replace: true,
                state: null,
            });
        }
    }, [location.state, location.pathname, navigate]);

    const { audience, setAudience, role, setRole } = useAudience();

    const handleRoleChange = (selectedRole: MockRole) => {
        setRole(selectedRole);

        setAudience(
            selectedRole === "STUDENT"
                ? TargetAudience.STUDENT
                : TargetAudience.TEACHER,
        );
    };

    const canManageNews = role === "ADMIN";

    return (
        <main className={styles.newsSection}>
            <header className={styles.header}>
                <h1>Nyheter</h1>

                {canManageNews && (
                    <Link to="/news/create" className={styles.createButton}>
                        + Skapa nyhet
                    </Link>
                )}
            </header>

            {/* Tillfällig rollväljare tills Security är implementerat */}
            <div>
                <label htmlFor="role">Välj roll: </label>

                <select
                    id="role"
                    value={role}
                    onChange={e => handleRoleChange(e.target.value as MockRole)}
                >
                    <option value="STUDENT">Student</option>
                    <option value="TEACHER">Lärare</option>
                    <option value="ADMIN">Admin (lärare)</option>
                </select>
            </div>
            {successMessage && (
                <p role="status" className={styles.successMessage}>
                    {successMessage}
                </p>
            )}
            <NewsList audience={audience} />
        </main>
    );
};

export default NewsPage;
