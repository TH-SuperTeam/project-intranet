import type { AuthUser } from "../types/AuthUser";
import type { LoginRequest } from "../types/LoginRequest";
import type { LoginResponse } from "../types/LoginResponse";
import { API_URL, apiFetch } from "./api";

export const login = async (
    credentials: LoginRequest,
): Promise<LoginResponse> => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (res.status === 401) {
        throw new Error("Fel e-postadress eller lösenord.");
    }

    if (!res.ok) {
        throw new Error("Kunde inte logga in. Försök igen.");
    }

    return res.json();
};

export const logoutRequest = async (): Promise<void> => {
    const response = await apiFetch("/api/auth/logout", {
        method: "POST",
    });

    if (!response.ok) {
        throw new Error("Kunde inte logga ut.");
    }
};

export const getCurrentUser = async (token: string): Promise<AuthUser> => {
    const res = await fetch(`${API_URL}/api/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Kunde inte verifiera inloggningen.");
    }

    return res.json();
};
