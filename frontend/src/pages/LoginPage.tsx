import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../components/common/SubmitButton";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validationError, setValidationError] = useState("");

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
        <main>
            <h1>Logga in</h1>

            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <label htmlFor="email">E-postadress</label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Lösenord</label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {validationError && <p role="alert">{validationError}</p>}

                {mutation.isError && (
                    <p role="alert">{mutation.error.message}</p>
                )}

                {mutation.isSuccess && (
                    <p role="status">Inloggningen lyckades!</p>
                )}

                <SubmitButton
                    isPending={mutation.isPending}
                    submitLabel="Logga in"
                    pendingLabel="Loggar in..."
                />
            </form>
        </main>
    );
};

export default LoginPage;
