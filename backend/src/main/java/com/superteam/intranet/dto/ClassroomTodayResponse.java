package com.superteam.intranet.dto;

import java.time.LocalDate;
import java.util.List;

public record ClassroomTodayResponse(
        LocalDate date,
        List<ClassroomStatus> classrooms
) {

    public record ClassroomStatus(
            Long id,
            String name,
            ClassroomAvailability status,
            List<ClassroomBookingResponse> bookings
    ) {}
}