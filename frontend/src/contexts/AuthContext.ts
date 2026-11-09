
import { createContext } from "react";
import type { AuthUser } from "../types/AuthUser";
import type { LoginRequest } from "../types/LoginRequest";

export type AuthContextType = {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    loginUser: (credentials: LoginRequest) => Promise<void>;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);
