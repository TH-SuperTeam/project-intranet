package com.superteam.intranet.dto;

import java.time.LocalTime;

public record ClassroomBookingResponse(
    Long classId,
    String className,
    LocalTime startTime,
    LocalTime endTime
){}
