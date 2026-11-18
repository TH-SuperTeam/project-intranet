package com.superteam.intranet.dto;

import com.superteam.intranet.model.OverrideType;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record ScheduleOverrideRequest (
    @NotNull
    Long weeklyScheduleId,

    @NotNull
    OverrideType overrideType,

    Long classroomId,

    LocalTime startTime,

    LocalTime endTime,

    @NotNull
    LocalDate validFrom,

    @NotNull
    LocalDate validUntil,

    String note
) {}
