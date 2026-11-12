package com.superteam.intranet.service;

import com.superteam.intranet.dto.DepartureResponse;
import com.superteam.intranet.mapper.TransportMapper;
import com.superteam.intranet.model.trafiklab.TrafikLabDeparture;
import com.superteam.intranet.model.trafiklab.TrafikLabDepartureList;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.client.RestClientException;

import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
public class TransportService {

    private final RestClient restClient;
    private final String stopId;
    private final String apiKey;
    private final TransportMapper transportMapper;

    public TransportService (RestClient.Builder restClientBuilder, @Value("${trafiklab.base-url}") String baseUrl, @Value("${trafiklab.stop-id}") String stopId, @Value("${trafiklab.api-key}") String apiKey, TransportMapper transportMapper) {
        this.restClient = restClientBuilder
                .baseUrl(baseUrl)
                .build();
        this.stopId = stopId;
        this.apiKey = apiKey;
        this.transportMapper = transportMapper;
    }

    public List<DepartureResponse> getDepartures(
            ) {
        TrafikLabDepartureList response;

        try {
            response = restClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/departures/{stopId}")
                            .queryParam("key", apiKey)
                            .build(stopId))
                    .retrieve()
                    .body(TrafikLabDepartureList.class);

        } catch (RestClientException exception) {
            throw new ResponseStatusException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "Kunde inte hämta avgångar från Trafiklab just nu.",
                    exception
            );
        }

        if (response == null || response.getDepartures() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Trafiklab returnerade ett ogiltigt svar."
            );
        }

        List<TrafikLabDeparture> departures = response.getDepartures();

        return departures.stream()
                .filter(departure -> !departure.isCanceled())
                .filter(departure -> departure.getRoute() != null)
                .filter(departure -> departure.getRoute().getDestination() != null)
                .filter(departure -> departure.getRealtime() != null)
                .filter(departure -> departure.getRealtime().isAfter(LocalDateTime.now()))
                .sorted(Comparator.comparing(TrafikLabDeparture::getRealtime))
                .limit(15)
                .map(transportMapper::toDepartureResponse)
                .toList();
        }
}
