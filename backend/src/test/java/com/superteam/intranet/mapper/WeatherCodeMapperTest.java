package com.superteam.intranet.mapper;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.assertEquals;

class WeatherCodeMapperTest {

    @ParameterizedTest
    @CsvSource({
            "1, Klart",
            "3, Halvklart",
            "4, Molnigt",
            "6, Mulet",
            "19, Regn",
            "26, Snöfall",
            "999, Okänt väder"
    })
    void shouldReturnSwedishWeatherDescription(
            int code, String expectedDescription) {

        assertEquals(
                expectedDescription,
                WeatherCodeMapper.toDescription(code)
        );
    }
}