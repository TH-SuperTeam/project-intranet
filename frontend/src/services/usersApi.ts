import type { CreateUserRequest } from "../types/CreateUserRequest";
import type { User } from "../types/User";
import { apiFetch } from "./api";
import type { Status } from "../types/Status";
import type { PublicUser } from "../types/PublicUser";

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

export const getUsers = async (
    search: string,
): Promise<(User | PublicUser)[]> => {
    const params = new URLSearchParams({ search });

    const res = await apiFetch(`/api/users?${params.toString()}`);

    if (!res.ok) {
        throw new Error(`Kunde inte hämta användare (${res.status}).`);
    }

    return res.json();
};

export const updateUserStatus = async (
    userId: number,
    status: Status,
): Promise<User> => {
    const res = await apiFetch(`/api/users/${userId}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
    });

    if (res.status === 403) {
        throw new Error("Du saknar behörighet att ändra användarstatus.");
    }

    if (res.status === 404) {
        throw new Error("Användaren kunde inte hittas.");
    }

    if (!res.ok) {
        throw new Error("Kunde inte uppdatera användarens status.");
    }

    return res.json();
};
