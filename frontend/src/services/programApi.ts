import { apiFetch } from "./api";
import type { Program } from "../types/Program";
import type { SchoolClass } from "../types/SchoolClass";

export const getPrograms = async (): Promise<Program[]> => {
    const response = await apiFetch("/api/programs");

    if (!response.ok) {
        throw new Error("Kunde inte hämta utbildningar.");
    }

    return response.json();
};

export const getClassesByProgramId = async (
    programId: number
): Promise<SchoolClass[]> => {
    const response = await apiFetch(`/api/classes?programId=${programId}`);

    if (!response.ok) {
        throw new Error("Kunde inte hämta klasser.");
    }

    return response.json();
};