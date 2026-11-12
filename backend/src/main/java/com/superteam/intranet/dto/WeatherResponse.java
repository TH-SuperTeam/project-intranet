package com.superteam.intranet.dto;

import java.time.Instant;

public record WeatherResponse (
        double temperature,
        String condition,
        int weatherCode,
        Instant forecastTime,
        Instant updatedAt
) {

}
