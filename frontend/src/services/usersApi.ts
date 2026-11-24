import type { CreateUserRequest } from "../types/CreateUserRequest";
import type { User } from "../types/User";
import { apiFetch } from "./api";
import type { Status } from "../types/Status";
import type { PublicUser } from "../types/PublicUser";
import type { MyProfile } from "../types/MyProfile";
import type { UpdateProfileRequest } from "../types/UpdateProfileRequest";
import type { UserProfile } from "../types/UserProfile";
import type { AccessRole } from "../types/AccessRole";
import type { ChangePasswordRequest } from "../types/ChangePasswordRequest";
import type { AdminUpdateUserRequest } from "../types/AdminUpdateUserRequest";
import type { GetUsersParams } from "../types/GetUsersParams";

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

export interface PaginatedUsers {
    content: (User | PublicUser)[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
    first: boolean;
    last: boolean;
}

export const getUsers = async ({
    search,
    page,
    size,
    filters,
}: GetUsersParams): Promise<PaginatedUsers> => {
    const params = new URLSearchParams({
        search,
        page: page.toString(),
        size: size.toString(),
    });

    if (filters.school != null) params.set("school", filters.school);
    if (filters.programId != null)
        params.set("programId", filters.programId.toString());
    if (filters.classId != null)
        params.set("classId", filters.classId.toString());
    if (filters.status != null) params.set("status", filters.status);
    if (filters.userType != null) params.set("userType", filters.userType);

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

export const updateUserRole = async (
    userId: number,
    accessRole: AccessRole,
): Promise<User> => {
    const res = await apiFetch(`/api/users/${userId}/role`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessRole }),
    });

    if (res.status === 403) {
        throw new Error("Du saknar behörighet att ändra användarens roll.");
    }

    if (res.status === 404) {
        throw new Error("Användaren kunde inte hittas.");
    }

    if (res.status === 400) {
        throw new Error("Rolländringen är inte tillåten.");
    }

    if (!res.ok) {
        throw new Error("Kunde inte uppdatera användarens roll.");
    }

    return res.json();
};

export const getMyProfile = async (): Promise<MyProfile> => {
    const res = await apiFetch("/api/users/me");

    if (!res.ok) {
        throw new Error("Kunde inte hämta din profil.");
    }

    return res.json();
};

export const updateMyProfile = async (
    profile: UpdateProfileRequest,
): Promise<MyProfile> => {
    const res = await apiFetch("/api/users/me", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
    });

    if (res.status === 409) {
        throw new Error("E-postadressen används redan av ett annat konto.");
    }

    if (res.status === 400) {
        throw new Error("Kontrollera att alla uppgifter är korrekt ifyllda.");
    }

    if (!res.ok) {
        throw new Error("Kunde inte uppdatera din profil.");
    }

    return res.json();
};

export const changePassword = async (
    request: ChangePasswordRequest,
): Promise<void> => {
    const res = await apiFetch("/api/users/me/password", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    if (res.status === 400) {
        const error = await res.json();
        throw new Error(
            error.message || "Kontrollera dina lösenordsuppgifter.",
        );
    }

    if (res.status === 401) {
        throw new Error("Din session har gått ut. Logga in igen.");
    }

    if (!res.ok) {
        throw new Error("Kunde inte ändra lösenordet.");
    }
};

export const getUserProfile = async (userId: number): Promise<UserProfile> => {
    const res = await apiFetch(`/api/users/${userId}`);

    if (res.status === 404) {
        throw new Error("Användaren kunde inte hittas.");
    }

    if (!res.ok) {
        throw new Error("Kunde inte hämta användarens profil.");
    }

    return res.json();
};

export const updateUserByAdmin = async (
    userId: number,
    user: AdminUpdateUserRequest,
): Promise<User> => {
    const res = await apiFetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (res.status === 403) {
        throw new Error("Du saknar behörighet att redigera användaren.");
    }

    if (res.status === 404) {
        throw new Error("Användaren kunde inte hittas.");
    }

    if (res.status === 409) {
        throw new Error("E-postadressen används redan av ett annat konto.");
    }

    if (res.status === 400) {
        throw new Error("Kontrollera att alla uppgifter är korrekt ifyllda.");
    }

    if (!res.ok) {
        throw new Error("Kunde inte uppdatera användaren.");
    }

    return res.json();
};
