import { apiFetch } from "./api";
import type { Program } from "../types/Program";
import type { SchoolClass } from "../types/SchoolClass";
import type { ProgramRequest } from "../types/ProgramRequest";

// GET – Hämta program
export const getPrograms = async (
    includeArchived: boolean = false,
): Promise<Program[]> => {
    const response = await apiFetch(
        `/api/programs?includeArchived=${includeArchived}`,
    );

    if (!response.ok) {
        throw new Error("Kunde inte hämta utbildningar.");
    }

    return response.json();
};

// GET – Hämta klasser för ett program
export const getClassesByProgramId = async (
    programId: number,
    includeArchived: boolean = false,
): Promise<SchoolClass[]> => {
    const response = await apiFetch(
        `/api/classes?programId=${programId}&includeArchived=${includeArchived}`,
    );

    if (!response.ok) {
        throw new Error("Kunde inte hämta klasser.");
    }

    return response.json();
};

// POST – Skapa program
export const createProgram = async (
    program: ProgramRequest,
): Promise<Program> => {
    const response = await apiFetch("/api/programs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(program),
    });

    if (!response.ok) {
        throw new Error("Kunde inte skapa utbildningen.");
    }

    return response.json();
};

// PUT – Uppdatera program
export const updateProgram = async (
    id: number,
    program: ProgramRequest,
): Promise<Program> => {
    const response = await apiFetch(`/api/programs/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(program),
    });

    if (!response.ok) {
        throw new Error("Kunde inte uppdatera utbildningen.");
    }

    return response.json();
};

// PATCH – Arkivera program
export const archiveProgram = async (id: number): Promise<Program> => {
    const response = await apiFetch(`/api/programs/${id}/archive`, {
        method: "PATCH",
    });

    if (!response.ok) {
        throw new Error("Kunde inte arkivera utbildningen.");
    }

    return response.json();
};

// PATCH – Återaktivera program
export const restoreProgram = async (id: number): Promise<Program> => {
    const response = await apiFetch(`/api/programs/${id}/restore`, {
        method: "PATCH",
    });

    if (!response.ok) {
        throw new Error("Kunde inte återaktivera utbildningen.");
    }

    return response.json();
};

// DELETE – Radera program permanent
export const deleteProgram = async (id: number): Promise<void> => {
    const response = await apiFetch(`/api/programs/${id}`, {
        method: "DELETE",
    });

    if (response.status === 409) {
        throw new Error(
            "Utbildningen kan inte raderas eftersom den har tillhörande klasser eller tilldelade elever.",
        );
    }

    if (!response.ok) {
        throw new Error("Kunde inte radera utbildningen.");
    }
};
