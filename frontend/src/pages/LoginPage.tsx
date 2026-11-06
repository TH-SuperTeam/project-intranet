import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import SubmitButton from "../components/common/SubmitButton";
import styles from "../components/auth/Login.module.css";
import Logo from "../components/common/Logo";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validationError, setValidationError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            setPassword("");
            navigate("/dashboard", { replace: true });
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidationError("");
        mutation.reset();

        const trimmedEmail = email.trim();

        if (!trimmedEmail || !password) {
            setValidationError("Fyll i e-postadress och lösenord.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(trimmedEmail)) {
            setValidationError("Ange en giltig e-postadress.");
            return;
        }

        mutation.mutate({
            email: trimmedEmail,
            password,
        });
    };

    return (
        <main className={styles.loginPage}>
            {/* Welcome section */}
            <section className={styles.welcomeSection}>
                <div className={styles.brand}>
                    <Logo variant="horizontal" className={styles.logoWhite} />
                </div>

                <div className={styles.welcomeContent}>
                    <h1 className={styles.welcomeTitle}>
                        Välkommen till Teknikhögskolans intranät
                    </h1>
                    <p className={styles.welcomeText}>
                        Här hittar du nyheter, information och smarta verktyg
                        som förenklar din vardag på skolan.
                    </p>
                </div>

                <div className={styles.welcomeDecoration} aria-hidden="true" />
            </section>

            {/* Login section */}
            <section className={styles.formSection}>
                <div className={styles.formDecoration} aria-hidden="true" />

                <div className={styles.loginCard}>
                    <div className={styles.cardHeader}>
                        <Logo variant="stacked" className={styles.logoGreen} />

                        <h2 className={styles.formTitle}>Logga in</h2>
                        <p className={styles.formDescription}>
                            Använd ditt skolkonto för att logga in.
                        </p>
                    </div>

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
                                <svg
                                    className={styles.inputIcon}
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <rect
                                        x="3"
                                        y="5"
                                        width="18"
                                        height="14"
                                        rx="2"
                                    />
                                    <path d="m3 7 9 6 9-6" />
                                </svg>

                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="username"
                                    placeholder="namn@teknikhogskolan.se"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.label}>
                                Lösenord
                            </label>

                            <div className={styles.inputWrapper}>
                                <svg
                                    className={styles.inputIcon}
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <rect
                                        x="5"
                                        y="10"
                                        width="14"
                                        height="11"
                                        rx="2"
                                    />
                                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                </svg>

                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="Ditt lösenord"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    className={styles.input}
                                />

                                <button
                                    type="button"
                                    className={styles.passwordToggle}
                                    aria-label={
                                        showPassword
                                            ? "Dölj lösenord"
                                            : "Visa lösenord"
                                    }
                                    aria-pressed={showPassword}
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <svg
                                            aria-hidden="true"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        >
                                            <path d="M3 3l18 18" />
                                            <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                                            <path d="M9.9 5.3A10.8 10.8 0 0 1 12 5c5 0 9 7 9 7a15 15 0 0 1-3.2 3.7" />
                                            <path d="M6.1 6.1C3.7 7.8 3 12 3 12s4 7 9 7a9 9 0 0 0 4.2-1" />
                                        </svg>
                                    ) : (
                                        <svg
                                            aria-hidden="true"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        >
                                            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
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
                            <p role="alert" className={styles.errorMessage}>
                                {mutation.error.message}
                            </p>
                        )}

                        <div className={styles.submitWrapper}>
                            <SubmitButton
                                isPending={mutation.isPending}
                                submitLabel="Logga in"
                                pendingLabel="Loggar in..."
                            />
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default LoginPage;
