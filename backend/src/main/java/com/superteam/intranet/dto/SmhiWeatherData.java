package com.superteam.intranet.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record SmhiWeatherData (

        // Temperatur i grader Celsius
        @JsonProperty("air_temperature")
        Double airTemperature,

        // Väderkod för att välja rätt ikon
        @JsonProperty("symbol_code")
        Integer symbolCode,

        //Vindhastighet i meter per sekund
        @JsonProperty("wind_speed")
        Double windSpeed,

        // Vindriktning i grader
        @JsonProperty("wind_from_direction")
        Double windDirection

) {

}
