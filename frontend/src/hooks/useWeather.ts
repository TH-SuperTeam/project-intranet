import { useQuery } from "@tanstack/react-query"
import { getWeather } from "../services/weatherApi"

export function useWeather() {
	return useQuery({
		queryKey: ["weather"],
		queryFn: getWeather,

		// Uppdaterar vädret varje timme
		refetchInterval: 60 * 60 * 1000,

		// Betraktar väderinformationen som aktuell i en timme
		staleTime: 60 * 60 * 1000,

		// Försöker igen en gång om anropet misslyckas
		retry: 1,
	})
}
