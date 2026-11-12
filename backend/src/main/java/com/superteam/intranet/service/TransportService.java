package com.superteam.intranet.service;

import com.superteam.intranet.dto.DepartureResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import org.springframework.beans.factory.annotation.Value;

import java.util.List;

@Service
public class TransportService {

    private final RestClient restClient;
    private final String stopId;
    private final String apiKey;

    public TransportService (RestClient.Builder restClientBuilder, @Value("${trafiklab.base-url}") String baseUrl, @Value("${trafiklab.stop-id}") String stopId, @Value("${trafiklab.api-key}") String apiKey) {
        this.restClient = restClientBuilder
                .baseUrl(baseUrl)
                .build();
        this.stopId = stopId;
        this.apiKey = apiKey;
    }

    public String getDepartures(
            ) {
        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/departures/{stopId}")
                        .queryParam("key", apiKey)
                        .build(stopId))
                .retrieve()
                .body(String.class);
        }
}
