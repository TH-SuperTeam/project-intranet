import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { login, getCurrentUser, logoutRequest } from "../services/authApi";
import type { AuthUser } from "../types/AuthUser";
import type { LoginRequest } from "../types/LoginRequest";
import { TOKEN_KEY } from "../services/api";
import { useQueryClient } from "@tanstack/react-query";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const queryClient = useQueryClient();

    useEffect(() => {
        let cancelled = false;

        const restoreSession = async () => {
            const token = sessionStorage.getItem(TOKEN_KEY);

            if (!token) {
                if (!cancelled) setIsLoading(false);
                return;
            }

            try {
                const currentUser = await getCurrentUser(token);

                if (!cancelled) {
                    if (currentUser.status !== "ACTIVE") {
                        sessionStorage.removeItem(TOKEN_KEY);
                        queryClient.clear();
                        setUser(null);
                    } else {
                        setUser(currentUser);
                    }
                }
            } catch {
                if (!cancelled) {
                    sessionStorage.removeItem(TOKEN_KEY);
                    setUser(null);
                    queryClient.clear();
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        };

        void restoreSession();

        return () => {
            cancelled = true;
        };
    }, [queryClient]);

    useEffect(() => {
        const handleUnauthorized = () => {
            sessionStorage.removeItem(TOKEN_KEY);
            setUser(null);
            queryClient.clear();
        };

        window.addEventListener("auth:unauthorized", handleUnauthorized);

        return () => {
            window.removeEventListener("auth:unauthorized", handleUnauthorized);
        };
    }, [queryClient]);

    const loginUser = async (credentials: LoginRequest) => {
        const response = await login(credentials);

        try {
            const currentUser = await getCurrentUser(response.token);

            if (currentUser.status !== "ACTIVE") {
                throw new Error("Kontot är inte aktivt.");
            }

            sessionStorage.setItem(TOKEN_KEY, response.token);
            setUser(currentUser);
        } catch {
            sessionStorage.removeItem(TOKEN_KEY);
            setUser(null);
            throw new Error("Kunde inte verifiera inloggningen.");
        }
    };

    const logout = async () => {
        try {
            await logoutRequest();
        } finally {
            sessionStorage.removeItem(TOKEN_KEY);
            setUser(null);
            queryClient.clear();
        }
    };

    return (
        <AuthContext
            value={{
                user,
                isAuthenticated: user !== null,
                isLoading,
                loginUser,
                logout,
            }}
        >
            {children}
        </AuthContext>
    );
};
