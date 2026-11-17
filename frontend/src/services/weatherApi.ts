import type { Weather } from "../types/Weather"
import { API_URL } from "./api"

export async function getWeather(): Promise<Weather> {
	const response = await fetch(`${API_URL}/api/weather`)

	if (!response.ok) {
		throw new Error("Kunde inte hämta vädeinformationen.")
	}

	return response.json()
}
