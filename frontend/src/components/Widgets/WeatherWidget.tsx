import {
	CloudSun,
	Cloud,
	CloudRain,
	CloudSnow,
	CloudFog,
	Sun,
	CloudLightning,
} from "lucide-react"

import { useWeather } from "../../hooks/useWeather"
import styles from "./Widgets.module.css"

// Väljer väderikon utifrån SMHI:s väderkod
function getWeatherIcon(code: number) {
	if (code === 1) return Sun
	if (code <= 3) return CloudSun
	if (code <= 6) return Cloud
	if (code === 7) return CloudFog
	if (code === 11 || code === 21) return CloudLightning
	if (code >= 15 && code <= 17) return CloudSnow
	if (code >= 25 && code <= 27) return CloudSnow

	return CloudRain
}

const WeatherWidget = () => {
	const { data, isPending, isError } = useWeather()

	// Väljer ikon när väderinformationen har hämtats
	const WeatherIcon = data ? getWeatherIcon(data.weatherCode) : CloudSun

	return (
		<section className={`${styles.infoWidget} ${styles.weatherWidget}`}>
			<header className={styles.infoWidgetHeader}>
				<CloudSun size={24} aria-hidden="true" />
				<h2>Vädret i Lund</h2>
			</header>

			<div className={styles.infoWidgetContent}>
				{isPending ? (
					<p role="status">Hämtar väder...</p>
				) : isError ? (
					<p role="alert">Kunde inte hämta väderinformationen.</p>
				) : (
					<div className={styles.weatherContent}>
						{/* Visar väderikon, temperatur och beskrivning tillsammans */}
						<div className={styles.weatherMain}>
							<WeatherIcon size={56} aria-hidden="true" />

							<div>
								<p className={styles.weatherTemperature}>
									{Math.round(data.temperature)} °C
								</p>
								<p className={styles.weatherCondition}>
									{data.condition}
								</p>
							</div>
						</div>

						{/* Visar när väderinformationen senast hämtades */}
						<p className={styles.weatherUpdated}>
							Uppdaterad{" "}
							{new Date(data.updatedAt).toLocaleTimeString(
								"sv-SE",
								{
									hour: "2-digit",
									minute: "2-digit",
									timeZone: "Europe/Stockholm",
								},
							)}
						</p>
					</div>
				)}
			</div>
		</section>
	)
}

export default WeatherWidget
