import type { Wheather } from "../types/Weather"
import { API_URL } from "./api"

export async function getWeather(): Promise<Wheather> {
	const response = await fetch(`${API_URL}/api/weather`)

	if (!response.ok) {
		throw new Error("Kunde inte hämta vädeinformationen.")
	}

	return response.json()
}
