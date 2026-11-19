package com.superteam.intranet.dto;

import java.time.Instant;

public record HourlyWeatherResponse(
        Instant time,
        double temperature,
        int weatherCode
) {
}
