package com.superteam.intranet.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.Instant;

// Ignorerar fält som inte finns i vårt record
@JsonIgnoreProperties(ignoreUnknown = true)
public record SmhiTimeSeries(

        // Tidpunkten som prognosen gäller för
        Instant time,

        // Väderinformationen för den tidpunkten
        SmhiWeatherData data
) {

}
