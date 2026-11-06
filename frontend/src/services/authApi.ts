import type { LoginRequest } from "../types/LoginRequest";
import type { LoginResponse } from "../types/LoginResponse";
import { API_URL } from "./api";

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
