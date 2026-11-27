import { isDaytime } from "../../utils/weatherUtils"
import { getWeatherIcon } from "./weatherIcons"

type WeatherIconProps = {
	weatherCode: number
	forecastTime: string
	size?: number
}

export default function WeatherIcon({
	weatherCode,
	forecastTime,
	size = 64,
}: WeatherIconProps) {
	const isDay = isDaytime(forecastTime)
	const icon = getWeatherIcon(weatherCode, isDay)

	return (
		<img src={icon} alt="" width={size} height={size} aria-hidden="true" />
	)
}
