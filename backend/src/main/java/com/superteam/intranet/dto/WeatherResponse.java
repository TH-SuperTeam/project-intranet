package com.superteam.intranet.dto;

import java.time.Instant;
import java.util.List;

public record WeatherResponse (
        double temperature,
        String condition,
        int weatherCode,
        Instant forecastTime,
        Instant updatedAt,
        List<HourlyWeatherResponse> hourlyForecasts
) {

}
