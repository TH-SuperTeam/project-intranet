import type { CreateUserRequest } from "../types/CreateUserRequest";

export const createUser = async (user: CreateUserRequest) => {
    const res = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (res.status === 409) {
        throw new Error("E-postadressen används redan av ett annat konto.");
    }

    if (!res.ok) {
        throw new Error("Kunde inte skapa användare.");
    }

    return res.json();
};
