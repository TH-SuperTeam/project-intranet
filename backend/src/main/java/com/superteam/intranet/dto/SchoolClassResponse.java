package com.superteam.intranet.dto;

import java.time.LocalDate;

public record SchoolClassResponse(
        Long id,
        String name,
        LocalDate startDate,
        LocalDate endDate,
        Long programId
) {
}