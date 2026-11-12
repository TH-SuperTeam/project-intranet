
package com.superteam.intranet.controller;

import com.superteam.intranet.dto.WeatherResponse;
import com.superteam.intranet.service.WeatherService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    // Returnerar aktuell väderprognos för skolan
    @GetMapping
    public WeatherResponse getCurrentWeather() {
        return weatherService.getCurrentWeather();
    }
}

