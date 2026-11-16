package com.superteam.intranet.mapper;

import com.superteam.intranet.dto.DepartureResponse;
import com.superteam.intranet.model.trafiklab.TrafikLabDeparture;
import org.springframework.stereotype.Component;

@Component
public class TransportMapper {

    public DepartureResponse toDepartureResponse(TrafikLabDeparture trafikLabDeparture) {
        return new DepartureResponse(
                trafikLabDeparture.getRoute().getDesignation(),
                trafikLabDeparture.getRoute().getDestination().getName(),
                trafikLabDeparture.getScheduled(),
                trafikLabDeparture.getRealtime()
        );
    }
}
