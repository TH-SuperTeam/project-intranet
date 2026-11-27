import clearDay from "@meteocons/svg/fill/clear-day.svg"
import clearNight from "@meteocons/svg/fill/clear-night.svg"
import mostlyClearDay from "@meteocons/svg/fill/mostly-clear-day.svg"
import mostlyClearNight from "@meteocons/svg/fill/mostly-clear-night.svg"
import partlyCloudyDay from "@meteocons/svg/fill/partly-cloudy-day.svg"
import partlyCloudyNight from "@meteocons/svg/fill/partly-cloudy-night.svg"
import overcastDay from "@meteocons/svg/fill/overcast-day.svg"
import overcastNight from "@meteocons/svg/fill/overcast-night.svg"
import cloudy from "@meteocons/svg/fill/cloudy.svg"
import overcast from "@meteocons/svg/fill/overcast.svg"
import fogDay from "@meteocons/svg/fill/fog-day.svg"
import fogNight from "@meteocons/svg/fill/fog-night.svg"

import partlyCloudyDayDrizzle from "@meteocons/svg/fill/partly-cloudy-day-drizzle.svg"
import partlyCloudyNightDrizzle from "@meteocons/svg/fill/partly-cloudy-night-drizzle.svg"
import partlyCloudyDayRain from "@meteocons/svg/fill/partly-cloudy-day-rain.svg"
import partlyCloudyNightRain from "@meteocons/svg/fill/partly-cloudy-night-rain.svg"
import extremeDayRain from "@meteocons/svg/fill/extreme-day-rain.svg"
import extremeNightRain from "@meteocons/svg/fill/extreme-night-rain.svg"
import drizzle from "@meteocons/svg/fill/drizzle.svg"
import rain from "@meteocons/svg/fill/rain.svg"
import extremeRain from "@meteocons/svg/fill/extreme-rain.svg"

import thunderstormsDayRain from "@meteocons/svg/fill/thunderstorms-day-rain.svg"
import thunderstormsNightRain from "@meteocons/svg/fill/thunderstorms-night-rain.svg"
import thunderstorm from "@meteocons/svg/fill/thunderstorms.svg"

import partlyCloudyDaySleet from "@meteocons/svg/fill/partly-cloudy-day-sleet.svg"
import partlyCloudyNightSleet from "@meteocons/svg/fill/partly-cloudy-night-sleet.svg"
import overcastDaySleet from "@meteocons/svg/fill/overcast-day-sleet.svg"
import overcastNightSleet from "@meteocons/svg/fill/overcast-night-sleet.svg"
import extremeDaySleet from "@meteocons/svg/fill/extreme-day-sleet.svg"
import extremeNightSleet from "@meteocons/svg/fill/extreme-night-sleet.svg"
import sleet from "@meteocons/svg/fill/sleet.svg"
import overcastSleet from "@meteocons/svg/fill/overcast-sleet.svg"
import extremeSleet from "@meteocons/svg/fill/extreme-sleet.svg"

import partlyCloudyDaySnow from "@meteocons/svg/fill/partly-cloudy-day-snow.svg"
import partlyCloudyNightSnow from "@meteocons/svg/fill/partly-cloudy-night-snow.svg"
import overcastDaySnow from "@meteocons/svg/fill/overcast-day-snow.svg"
import overcastNightSnow from "@meteocons/svg/fill/overcast-night-snow.svg"
import extremeDaySnow from "@meteocons/svg/fill/extreme-day-snow.svg"
import extremeNightSnow from "@meteocons/svg/fill/extreme-night-snow.svg"
import snow from "@meteocons/svg/fill/snow.svg"
import overcastSnow from "@meteocons/svg/fill/overcast-snow.svg"
import extremeSnow from "@meteocons/svg/fill/extreme-snow.svg"

import notAvailable from "@meteocons/svg/fill/not-available.svg"

type WeatherIconPair = {
    day: string
    night: string
}

// Kopplar SMHI:s väderkoder till dag- och nattikoner
const weatherIcons: Partial<Record<number, WeatherIconPair>> = {
    1: { day: clearDay, night: clearNight },
    2: { day: mostlyClearDay, night: mostlyClearNight },
    3: { day: partlyCloudyDay, night: partlyCloudyNight },
    4: { day: overcastDay, night: overcastNight },
    5: { day: cloudy, night: cloudy },
    6: { day: overcast, night: overcast },
    7: { day: fogDay, night: fogNight },
    8: { day: partlyCloudyDayDrizzle, night: partlyCloudyNightDrizzle },
    9: { day: partlyCloudyDayRain, night: partlyCloudyNightRain },
    10: { day: extremeDayRain, night: extremeNightRain },
    11: { day: thunderstormsDayRain, night: thunderstormsNightRain },
    12: { day: partlyCloudyDaySleet, night: partlyCloudyNightSleet },
    13: { day: overcastDaySleet, night: overcastNightSleet },
    14: { day: extremeDaySleet, night: extremeNightSleet },
    15: { day: partlyCloudyDaySnow, night: partlyCloudyNightSnow },
    16: { day: overcastDaySnow, night: overcastNightSnow },
    17: { day: extremeDaySnow, night: extremeNightSnow },
    18: { day: drizzle, night: drizzle },
    19: { day: rain, night: rain },
    20: { day: extremeRain, night: extremeRain },
    21: { day: thunderstorm, night: thunderstorm },
    22: { day: sleet, night: sleet },
    23: { day: overcastSleet, night: overcastSleet },
    24: { day: extremeSleet, night: extremeSleet },
    25: { day: snow, night: snow },
    26: { day: overcastSnow, night: overcastSnow },
    27: { day: extremeSnow, night: extremeSnow },
}

// Hämtar rätt väderikon utifrån väderkod och tid på dygnet
export function getWeatherIcon(code: number, isDay: boolean): string {
    const icons = weatherIcons[code]

    if (!icons) return notAvailable

    return isDay ? icons.day : icons.night
}