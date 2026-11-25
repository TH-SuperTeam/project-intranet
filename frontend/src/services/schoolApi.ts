import { apiFetch } from "./api";
import type { School } from "../types/School";

export const getSchools = async (): Promise<School[]> => {
    const response = await apiFetch("/api/schools");

    if (!response.ok) {
        throw new Error("Kunde inte hämta skolor.");
    }

    return response.json();
};
