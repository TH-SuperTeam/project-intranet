import { useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import useResetPassword from "../hooks/useResetPassword";
import SubmitButton from "../components/common/SubmitButton";
import styles from "../components/auth/Login.module.css";
import useValidateResetToken from "../hooks/useValidateResetToken";

// Länk som ser ut som SubmitButton
const linkButtonClass =
    "inline-block rounded-lg bg-(--color-secondary-light) px-4 py-2 text-sm font-semibold text-(--color-secondary-dark) transition-colors duration-200 hover:bg-(--color-secondary) hover:text-(--color-text-white) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-secondary-dark)";

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [validationError, setValidationError] = useState("");

    const mutation = useResetPassword();

    const tokenCheck = useValidateResetToken(token);

    if (tokenCheck.error instanceof TypeError) {
        return (
            <main className={`${styles.formSection} ${styles.authPage}`}>
                <div className={styles.loginCard}>
                    <div className={styles.cardHeader}>
                        <h1 className={styles.formTitle}>Något gick fel</h1>
                        <p className={styles.formDescription}>
                            Kunde inte ansluta till servern. Försök igen.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => tokenCheck.refetch()}
                        className={`${linkButtonClass} cursor-pointer`}
                    >
                        Försök igen
                    </button>
                </div>
            </main>
        );
    }

    if (!token || tokenCheck.isError) {
        return (
            <main className={`${styles.formSection} ${styles.authPage}`}>
                <div className={styles.loginCard}>
                    <div className={styles.cardHeader}>
                        <h1 className={styles.formTitle}>Ogiltig länk</h1>
                        <p className={styles.formDescription}>
                            Länken är ogiltig eller har gått ut.
                        </p>
                    </div>

                    <Link
                        to="/login/forgot-password"
                        className={linkButtonClass}
                    >
                        Begär en ny länk
                    </Link>
                </div>
            </main>
        );
    }

    if (tokenCheck.isPending) {
        return (
            <main className={`${styles.formSection} ${styles.authPage}`}>
                <div className={styles.loginCard}>
                    <p role="status" className={styles.formDescription}>
                        Kontrollerar länken...
                    </p>
                </div>
            </main>
        );
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidationError("");
        mutation.reset();

        if (!token) return;

        if (newPassword.length < 12) {
            setValidationError(
                "Det nya lösenordet måste vara minst 12 tecken.",
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            setValidationError("De nya lösenorden matchar inte.");
            return;
        }

        // Bekräftelsefältet skickas inte till backend
        mutation.mutate({ token, newPassword });
    };

    return (
        <main className={`${styles.formSection} ${styles.authPage}`}>
            <div className={styles.loginCard}>
                <div className={styles.cardHeader}>
                    <h1 className={styles.formTitle}>Nytt lösenord</h1>

                    {!mutation.isSuccess && (
                        <p className={styles.formDescription}>
                            Välj ett nytt lösenord med minst 12 tecken.
                        </p>
                    )}
                </div>

                {mutation.isSuccess ? (
                    <>
                        <p role="status" className={styles.successMessage}>
                            Ditt lösenord är ändrat. Du kan nu logga in med det
                            nya lösenordet.
                        </p>

                        <Link to="/login" className={`${linkButtonClass} mt-4`}>
                            Gå till inloggningen
                        </Link>
                    </>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        className={styles.form}
                    >
                        <div className={styles.formGroup}>
                            <label
                                htmlFor="newPassword"
                                className={styles.label}
                            >
                                Nytt lösenord
                            </label>

                            <div className={styles.inputWrapper}>
                                <Lock
                                    className={styles.inputIcon}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />

                                <input
                                    id="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    placeholder="Minst 12 tecken"
                                    value={newPassword}
                                    onChange={e =>
                                        setNewPassword(e.target.value)
                                    }
                                    required
                                    className={styles.input}
                                />

                                <button
                                    type="button"
                                    className={styles.passwordToggle}
                                    aria-label={
                                        showNewPassword
                                            ? "Dölj lösenord"
                                            : "Visa lösenord"
                                    }
                                    aria-pressed={showNewPassword}
                                    onClick={() =>
                                        setShowNewPassword(!showNewPassword)
                                    }
                                >
                                    {showNewPassword ? (
                                        <EyeOff
                                            strokeWidth={1.8}
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <Eye
                                            strokeWidth={1.8}
                                            aria-hidden="true"
                                        />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label
                                htmlFor="confirmPassword"
                                className={styles.label}
                            >
                                Bekräfta nytt lösenord
                            </label>

                            <div className={styles.inputWrapper}>
                                <Lock
                                    className={styles.inputIcon}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />

                                <input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    autoComplete="new-password"
                                    placeholder="Upprepa lösenordet"
                                    value={confirmPassword}
                                    onChange={e =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    required
                                    className={styles.input}
                                />

                                <button
                                    type="button"
                                    className={styles.passwordToggle}
                                    aria-label={
                                        showConfirmPassword
                                            ? "Dölj lösenord"
                                            : "Visa lösenord"
                                    }
                                    aria-pressed={showConfirmPassword}
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword,
                                        )
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff
                                            strokeWidth={1.8}
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <Eye
                                            strokeWidth={1.8}
                                            aria-hidden="true"
                                        />
                                    )}
                                </button>
                            </div>
                        </div>

                        {validationError && (
                            <p role="alert" className={styles.errorMessage}>
                                {validationError}
                            </p>
                        )}

                        {mutation.isError && (
                            <div role="alert" className={styles.errorMessage}>
                                <p>
                                    {mutation.error instanceof TypeError
                                        ? "Kunde inte ansluta till servern. Försök igen."
                                        : mutation.error.message}
                                </p>

                                {!(mutation.error instanceof TypeError) && (
                                    <Link
                                        to="/login/forgot-password"
                                        className={`${linkButtonClass} mt-3`}
                                    >
                                        Begär en ny länk
                                    </Link>
                                )}
                            </div>
                        )}

                        <div className={styles.submitWrapper}>
                            <SubmitButton
                                isPending={mutation.isPending}
                                submitLabel="Spara nytt lösenord"
                                pendingLabel="Sparar..."
                            />
                        </div>
                    </form>
                )}
            </div>
        </main>
    );
};

export default ResetPasswordPage;
