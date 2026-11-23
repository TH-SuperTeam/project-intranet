package com.superteam.intranet.dto;

import java.time.Instant;
import java.util.List;

public record WeatherResponse (
        double temperature,
        String condition,
        int weatherCode,
        Double windSpeed,
        Double windDirection,
        Instant forecastTime,
        Instant updatedAt,
        List<HourlyWeatherResponse> hourlyForecasts
) {

}
