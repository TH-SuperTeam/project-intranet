package com.superteam.intranet.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record WeeklyScheduleResponse (
    Long id,

    Long classId,
    String className,

    Long classroomId,
    String classroomName,

    Integer weekday,

    LocalTime startTime,
    LocalTime endTime,

    LocalDate validFrom,
    LocalDate validUntil
) {}
