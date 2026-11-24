import { apiFetch } from "./api";
import type { SchoolClass } from "../types/SchoolClass";
import type { SchoolClassRequest } from "../types/SchoolClassRequest";

// GET – Hämta alla klasser
export const getClasses = async (
    includeArchived: boolean = false,
): Promise<SchoolClass[]> => {
    const response = await apiFetch(
        `/api/classes?includeArchived=${includeArchived}`,
    );

    if (!response.ok) {
        throw new Error("Kunde inte hämta klasser.");
    }

    return response.json();
};

// POST – Skapa klass
export const createClass = async (
    schoolClass: SchoolClassRequest,
): Promise<SchoolClass> => {
    const response = await apiFetch("/api/classes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(schoolClass),
    });

    if (response.status === 409) {
        throw new Error("Klassen kunde inte skapas på grund av en konflikt.");
    }

    if (!response.ok) {
        throw new Error("Kunde inte skapa klassen.");
    }

    return response.json();
};

// PUT – Uppdatera klass
export const updateClass = async (
    id: number,
    schoolClass: SchoolClassRequest,
): Promise<SchoolClass> => {
    const response = await apiFetch(`/api/classes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(schoolClass),
    });

    if (response.status === 409) {
        throw new Error(
            "Klassen kunde inte uppdateras på grund av en konflikt.",
        );
    }

    if (!response.ok) {
        throw new Error("Kunde inte uppdatera klassen.");
    }

    return response.json();
};

// PATCH – Arkivera klass
export const archiveClass = async (id: number): Promise<SchoolClass> => {
    const response = await apiFetch(`/api/classes/${id}/archive`, {
        method: "PATCH",
    });

    if (!response.ok) {
        throw new Error("Kunde inte arkivera klassen.");
    }

    return response.json();
};

// PATCH – Återaktivera klass
export const restoreClass = async (id: number): Promise<SchoolClass> => {
    const response = await apiFetch(`/api/classes/${id}/restore`, {
        method: "PATCH",
    });

    if (!response.ok) {
        throw new Error("Kunde inte återaktivera klassen.");
    }

    return response.json();
};

// DELETE – Radera klass permanent
export const deleteClass = async (id: number): Promise<void> => {
    const response = await apiFetch(`/api/classes/${id}`, {
        method: "DELETE",
    });

    if (response.status === 409) {
        throw new Error(
            "Klassen kan inte raderas eftersom den har befintliga kopplingar.",
        );
    }

    if (!response.ok) {
        throw new Error("Kunde inte radera klassen.");
    }
};
