
package com.superteam.intranet.service;

import com.superteam.intranet.dto.HourlyWeatherResponse;
import com.superteam.intranet.dto.SmhiTimeSeries;
import com.superteam.intranet.dto.SmhiWeatherResponse;
import com.superteam.intranet.dto.WeatherResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;
import com.superteam.intranet.mapper.WeatherCodeMapper;
import com.superteam.intranet.dto.HourlyWeatherResponse;

import java.time.Instant;
import java.util.Comparator;
import java.util.List;

@Service
public class WeatherService {

    private final RestClient restClient;
    private final String smhiUrl;

    public WeatherService(
            @Value("${weather.smhi.url}") String smhiUrl
    ) {
        // Skapar en RestClient som kan anropa SMHI:s API
        this.restClient = RestClient.create();
        this.smhiUrl = smhiUrl;
    }

    // Hämtar väderprognosen från SMHI
    public WeatherResponse getCurrentWeather() {

        SmhiWeatherResponse response;

        try {
            response = restClient.get()
                    .uri(smhiUrl)
                    .retrieve()
                    .body(SmhiWeatherResponse.class);

        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Kunde inte hämta väder från SMHI",
                    e
            );
        }

        // Kontrollera att SMHI skickade prognoser
        if (response == null ||
                response.timeSeries() == null ||
                response.timeSeries().isEmpty()) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "SMHI returnerade ingen väderdata"
            );
        }

        Instant now = Instant.now();

        // Filtrerar och sorterar kommande prognoser
        List<SmhiTimeSeries> forecasts = response.timeSeries()
                .stream()
                .filter(item -> item != null
                        && item.time() != null
                        && !item.time().isBefore(now)
                        && item.data() != null
                        && item.data().airTemperature() != null
                        && item.data().symbolCode() != null)
                .sorted(Comparator.comparing(SmhiTimeSeries::time))
                .toList();

                // Kontrollera att det finns minst en giltig prognos
                if (forecasts.isEmpty()) {
                    throw new ResponseStatusException(
                            HttpStatus.BAD_GATEWAY,
                            "Ingen giltig väderprognos hittades"
                    );

                }

        // Hämtar den första prognosen från den sorterade listan
        SmhiTimeSeries current = forecasts.getFirst();


        // Översätter SMHI:s väderkod till en svensk beskrivning
        String condition = WeatherCodeMapper.toDescription(
                current.data().symbolCode()
        );

        // Skapar en lista med de fyra kommande prognoserna
        List<HourlyWeatherResponse> hourlyForecasts = forecasts.stream()
                .skip(1)
                .limit(4)
                .map(item -> new HourlyWeatherResponse(
                        item.time(),
                        item.data().airTemperature(),
                        item.data().symbolCode()
                ))
                .toList();

        return new WeatherResponse(
                current.data().airTemperature(),
                condition,
                current.data().symbolCode(),
                current.time(),
                Instant.now(),
                hourlyForecasts

        );
    }




}
