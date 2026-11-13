package com.superteam.intranet.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record SmhiWeatherData (

        // Kopplar JSON-fältet air_temperature till airTemperature
        @JsonProperty("air_temperature")
        Double airTemperature,

        // Kopplar JSON-fältet symbol_code till symbolCode
        @JsonProperty("symbol_code")
        Integer symbolCode
) {

}
