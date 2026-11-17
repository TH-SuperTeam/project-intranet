export type HourlyWeather ={
		time: string
		temperature: number
		weatherCode: number
	}

export type Weather = {
	temperature: number
	condition: string
	weatherCode: number
	forecastTime: string
	updatedAt: string
	hourlyForecasts: HourlyWeather[]

}
