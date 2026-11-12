package com.superteam.intranet.dto;

import java.time.LocalDateTime;

public record DepartureResponse (
    String lineNumber,
    String destination,
    LocalDateTime scheduledDeparture,
    LocalDateTime estimatedDeparture,
    Integer delayMinutes
) {
}
