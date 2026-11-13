import type { Departure } from "../types/Departure";
import { API_URL } from "./api";

export async function getTransport(): Promise<Array<Departure>> {
    const response = await fetch(`${API_URL}/api/transport/departures`);

    if (!response.ok) {
        throw new Error("Kunde inte hämta bussinformationen.");
    }

    return response.json();
}
