import clearDay from "@meteocons/svg/fill/clear-day.svg"
import partlyCloudyDay from "@meteocons/svg/fill/partly-cloudy-day.svg"
import cloudy from "@meteocons/svg/fill/cloudy.svg"
import overcast from "@meteocons/svg/fill/overcast.svg"
import fog from "@meteocons/svg/fill/fog.svg"
import rain from "@meteocons/svg/fill/rain.svg"
import snow from "@meteocons/svg/fill/snow.svg"
import thunderstorm from "@meteocons/svg/fill/thunderstorms.svg"
import sleet from "@meteocons/svg/fill/sleet.svg"

type WeatherIconProps = {
  weatherCode: number
  size?: number
}
// Väljer väderikon utifrån SMHI:s väderkod
function getWeatherIcon(code: number): string {
  if (code === 1) return clearDay
  if (code <= 3) return partlyCloudyDay
  if (code <= 5) return cloudy
  if (code === 6) return overcast
  if (code === 7) return fog

  if (code === 11 || code === 21) return thunderstorm

  if ([12, 13, 14, 22, 23, 24].includes(code)) return sleet

  if ([15, 16, 17, 25, 26, 27].includes(code)) return snow

  return rain
}

export default function WeatherIcon({ weatherCode, size = 64 }: WeatherIconProps) {
  const icon = getWeatherIcon(weatherCode)

  return <img src={icon} alt="" width={size} height={size} aria-hidden="true" />
}
