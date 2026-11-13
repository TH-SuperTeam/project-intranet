package com.superteam.intranet.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

// Ignorerar fält från SMHI som vi inte behöver
@JsonIgnoreProperties(ignoreUnknown = true)
public record SmhiWeatherResponse(

        // Lista med väderprognoser för olika tidpunkter
        List<SmhiTimeSeries> timeSeries
) {
}