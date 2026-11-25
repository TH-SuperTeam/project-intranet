import { getPosition } from "suncalc"

const LATITUDE = 55.691756
const LONGITUDE = 13.212687

// Avgör om solen är överhorisonten vid prognosens tidpunkt
export function isDaytime(forecastTime: string): boolean {
	const date = new Date(forecastTime)

	if (Number.isNaN(date.getTime())) return false

	const sunPosition = getPosition(date, LATITUDE, LONGITUDE)

	return sunPosition.altitude > 0
}
