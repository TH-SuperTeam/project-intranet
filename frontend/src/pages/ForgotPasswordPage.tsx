import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import useForgotPassword from "../hooks/useForgotPassword";
import SubmitButton from "../components/common/SubmitButton";
import BackLink from "../components/common/BackLink";
import styles from "../components/auth/Login.module.css";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [validationError, setValidationError] = useState("");

    const mutation = useForgotPassword();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidationError("");
        mutation.reset();

        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setValidationError("Fyll i din e-postadress.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            setValidationError("Ange en giltig e-postadress.");
            return;
        }

        mutation.mutate({ email: trimmedEmail });
    };

    return (
        <main className={`${styles.formSection} ${styles.authPage}`}>
            <div className={styles.loginCard}>
                <div className="mb-6">
                    <BackLink to="/login" label="Tillbaka till inloggningen" />
                </div>

                <div className={styles.cardHeader}>
                    <h1 className={styles.formTitle}>Glömt lösenord?</h1>

                    {!mutation.isSuccess && (
                        <p className={styles.formDescription}>
                            Ange din e-postadress så skickar vi en länk där du
                            kan välja ett nytt lösenord.
                        </p>
                    )}
                </div>

                {mutation.isSuccess ? (
                    <p role="status" className={styles.successMessage}>
                        Om e-postadressen finns hos oss har vi skickat en länk
                        för att återställa lösenordet. Länken är giltig i 10
                        minuter.
                    </p>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        className={styles.form}
                    >
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>
                                E-postadress
                            </label>

                            <div className={styles.inputWrapper}>
                                <Mail
                                    className={styles.inputIcon}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />

                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="username"
                                    placeholder="namn@teknikhogskolan.se"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        {validationError && (
                            <p role="alert" className={styles.errorMessage}>
                                {validationError}
                            </p>
                        )}

                        {mutation.isError && (
                            <p role="alert" className={styles.errorMessage}>
                                {mutation.error instanceof TypeError
                                    ? "Kunde inte ansluta till servern. Försök igen."
                                    : mutation.error.message}
                            </p>
                        )}

                        <div className={styles.submitWrapper}>
                            <SubmitButton
                                isPending={mutation.isPending}
                                submitLabel="Skicka länk"
                                pendingLabel="Skickar..."
                            />
                        </div>
                    </form>
                )}
            </div>
        </main>
    );
};

export default ForgotPasswordPage;
