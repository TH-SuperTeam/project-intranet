import WeatherIcon from "./WeatherIcon"
import { useWeather } from "../../hooks/useWeather"
import styles from "./Widgets.module.css"

const WeatherWidget = () => {
	const { data, isPending, isError } = useWeather()

	return (
		<section className={`${styles.infoWidget} ${styles.weatherWidget}`}>
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
				) : (
					<div className={styles.weatherContent}>
						{/* Aktuellt väder */}
						<div className={styles.weatherMain}>
							<WeatherIcon
								weatherCode={data.weatherCode}
								size={80}
							/>

							<div>
								<p className={styles.weatherTemperature}>
									{Math.round(data.temperature)} °C
								</p>
								<p className={styles.weatherCondition}>
									{data.condition}
								</p>
							</div>
						</div>

						{/* Kommande timmars väder */}
						<div className={styles.weatherHourly}>
							{data.hourlyForecasts.map(forecast => (
								<div
									key={forecast.time}
									className={styles.weatherHourlyItem}
								>
									<p className={styles.weatherHourlyTime}>
										{new Date(
											forecast.time,
										).toLocaleTimeString("sv-SE", {
											hour: "2-digit",
											minute: "2-digit",
											timeZone: "Europe/Stockholm",
										})}
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
