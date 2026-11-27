import type { AuthUser } from "../types/AuthUser";
import type { ForgotPasswordRequest } from "../types/ForgotPasswordRequest";
import type { LoginRequest } from "../types/LoginRequest";
import type { LoginResponse } from "../types/LoginResponse";
import type { ResetPasswordRequest } from "../types/ResetPasswordRequest";
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

export const forgotPassword = async (
    request: ForgotPasswordRequest,
): Promise<void> => {
    const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    if (!res.ok) {
        throw new Error("Kunde inte skicka begäran. Försök igen.");
    }
};

export const resetPassword = async (
    request: ResetPasswordRequest,
): Promise<void> => {
    const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    if (res.status === 400) {
        throw new Error(
            "Länken är ogiltig eller har gått ut. Begär en ny länk.",
        );
    }

    if (!res.ok) {
        throw new Error("Kunde inte uppdatera lösenordet. Försök igen.");
    }
};

export const validateResetToken = async (token: string): Promise<void> => {
    const res = await fetch(`${API_URL}/api/auth/validate-reset-token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
    });

    if (res.status === 400) {
        throw new Error(
            "Länken är ogiltig eller har gått ut. Begär en ny länk.",
        );
    }

    if (!res.ok) {
        throw new Error("Kunde inte kontrollera länken. Försök igen.");
    }
};
