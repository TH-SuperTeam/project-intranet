import type { CreateUserRequest } from "../types/CreateUserRequest";
import type { TargetAudience } from "../types/TargetAudience";
import type { User } from "../types/User";
import { apiFetch } from "./api";

export const createUser = async (user: CreateUserRequest) => {
    const res = await apiFetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (res.status === 409) {
        throw new Error("E-postadressen används redan av ett annat konto.");
    }

    if (res.status === 403) {
        throw new Error("Du saknar behörighet att skapa användare.");
    }

    if (!res.ok) {
        throw new Error("Kunde inte skapa användare.");
    }

    return res.json();
};

export const getUsers = async (): Promise<User[]> => {
    const res = await apiFetch(`/api/users`);

    if (!res.ok) {
        throw new Error(`Kunde inte hämta användare (${res.status}).`);
    }

    return res.json();
};
