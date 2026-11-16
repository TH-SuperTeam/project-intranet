
package com.superteam.intranet.service;

import com.superteam.intranet.dto.SmhiTimeSeries;
import com.superteam.intranet.dto.SmhiWeatherResponse;
import com.superteam.intranet.dto.WeatherResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;
import com.superteam.intranet.mapper.WeatherCodeMapper;

import java.time.Instant;
import java.util.Comparator;

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

        // Välj den första prognosen som inte har passerat
        SmhiTimeSeries forecast = response.timeSeries()
                .stream()
                .filter(item -> item != null
                        && item.time() != null
                        && !item.time().isBefore(now)
                        && item.data() != null
                        && item.data().airTemperature() != null
                        && item.data().symbolCode() != null)
                .min(Comparator.comparing(SmhiTimeSeries::time))
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_GATEWAY,
                        "Ingen giltig väderprognos hittades"
                ));

        // Översätter SMHI:s väderkod till en svensk beskrivning
        String condition = WeatherCodeMapper.toDescription(
                forecast.data().symbolCode()
        );

        return new WeatherResponse(
                forecast.data().airTemperature(),
                condition,
                forecast.data().symbolCode(),
                forecast.time(),
                Instant.now()
        );
    }


}
