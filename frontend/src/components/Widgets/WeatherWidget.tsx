import WeatherIcon from "./WeatherIcon"
import { useWeather } from "../../hooks/useWeather"
import styles from "./Widgets.module.css"
import { Wind } from "lucide-react"

// Omvandlar vindriktning i grader till väderstreck
function getWindDirection(degrees: number): string {
	const directions = ["N", "NO", "Ö", "SO", "S", "SV", "V", "NV"]

	const index = Math.round(degrees / 45) % 8

	return directions[index]
}

// Formaterar prognostiden till svensk tid
function formatWeatherTime(time: string): string {
	return new Date(time).toLocaleTimeString("sv-SE", {
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "Europe/Stockholm",
	})
}

type WeatherWidgetProps = {
	variant?: "default" | "public"
}

const WeatherWidget = ({ variant = "default" }: WeatherWidgetProps) => {
	const { data, isPending, isError } = useWeather()

	// Publika dashboarden visar två prognoser med två timmars mellanrum
	const publicForecasts = (() => {
		if (!data || variant !== "public") return []

		const now = new Date()

		// Hämta endast framtida prognoser
		const upcoming = data.hourlyForecasts
			.filter(forecast => new Date(forecast.time) > now)
			.sort(
				(a, b) =>
					new Date(a.time).getTime() - new Date(b.time).getTime(),
			)

		// Välj första prognosen och den som ligger två timmar senare
		const first = upcoming[0]

		if (!first) return []

		const twoHoursLater =
			new Date(first.time).getTime() + 2 * 60 * 60 * 1000

		const second = upcoming.find(
			forecast => new Date(forecast.time).getTime() >= twoHoursLater,
		)

		return second ? [first, second] : [first]
	})()

	return (
		<section
			className={`${styles.infoWidget} ${styles.weatherWidget} ${
				variant === "public" ? styles.publicWeatherWidget : ""
			}`}
		>
			<header className={styles.infoWidgetHeader}>
				<div>
					<h2>Vädret i Lund</h2>
					<p className={styles.weatherAddress}>Kalkstensvägen 3A</p>
				</div>

				{/* Visar när väderinformationen senast hämtades */}
				{data && (
					<p className={styles.weatherUpdated}>
						Uppdaterad{" "}
						{new Date(data.updatedAt).toLocaleTimeString("sv-SE", {
							hour: "2-digit",
							minute: "2-digit",
							timeZone: "Europe/Stockholm",
						})}
					</p>
				)}
			</header>

			<div className={styles.infoWidgetContent}>
				{isPending ? (
					<p role="status">Hämtar väder...</p>
				) : isError ? (
					<p role="alert">Kunde inte hämta väderinformationen.</p>
				) : variant === "public" ? (
					/* Kompakt väderwidget för publik TV-skärm */
					<div className={styles.publicWeatherContent}>
						<div className={styles.publicWeatherCurrent}>
							<WeatherIcon
								weatherCode={data.weatherCode}
								size={60}
							/>

							<div className={styles.publicWeatherCurrentDetails}>
								<p className={styles.weatherTemperature}>
									{Math.round(data.temperature)} °C
								</p>

								<p className={styles.weatherCondition}>
									{data.condition}
								</p>

								<p className={styles.weatherWind}>
									<Wind size={16} aria-hidden="true" />
									{Math.round(data.windSpeed)} m/s (
									{getWindDirection(data.windDirection)})
								</p>
							</div>
						</div>

						{/* Två utvalda prognoser */}
						<div className={styles.publicWeatherForecasts}>
							{publicForecasts.map(forecast => (
								<div
									key={forecast.time}
									className={styles.publicWeatherForecastItem}
								>
									<span
										className={
											styles.publicWeatherForecastTime
										}
									>
										{formatWeatherTime(forecast.time)}
									</span>

									<WeatherIcon
										weatherCode={forecast.weatherCode}
										size={42}
									/>

									<span
										className={
											styles.publicWeatherForecastTemperature
										}
									>
										{Math.round(forecast.temperature)}°
									</span>
								</div>
							))}
						</div>
					</div>
				) : (
					/* Befintlig väderwidget för inloggad dashboard */
					<div className={styles.weatherContent}>
						<div className={styles.weatherMain}>
							<p className={styles.weatherTemperature}>
								{Math.round(data.temperature)} °C
							</p>

							<div className={styles.weatherDetails}>
								<p className={styles.weatherCondition}>
									{data.condition}
								</p>

								<p className={styles.weatherWind}>
									<Wind size={16} aria-hidden="true" />
									{Math.round(data.windSpeed)} m/s (
									{getWindDirection(data.windDirection)})
								</p>
							</div>

							<WeatherIcon
								weatherCode={data.weatherCode}
								size={120}
							/>
						</div>

						<div className={styles.weatherHourly}>
							{data.hourlyForecasts.map(forecast => (
								<div
									key={forecast.time}
									className={styles.weatherHourlyItem}
								>
									<p className={styles.weatherHourlyTime}>
										{formatWeatherTime(forecast.time)}
									</p>

									<WeatherIcon
										weatherCode={forecast.weatherCode}
										size={48}
									/>

									<p
										className={
											styles.weatherHourlyTemperature
										}
									>
										{Math.round(forecast.temperature)} °C
									</p>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</section>
	)
}

export default WeatherWidget
