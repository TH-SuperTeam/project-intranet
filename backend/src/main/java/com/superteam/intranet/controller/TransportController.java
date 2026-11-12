package com.superteam.intranet.controller;

import com.superteam.intranet.dto.DepartureResponse;
import com.superteam.intranet.model.trafiklab.TrafikLabDepartureList;
import com.superteam.intranet.service.TransportService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/transport")
public class TransportController {

    private final TransportService transportService;

    public TransportController(TransportService transportService) {
        this.transportService = transportService;
    }

    @GetMapping("/departures")
    public List<DepartureResponse> getDepartures() {
        return transportService.getDepartures();
    }
}
