
package com.superteam.intranet.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record WeeklyScheduleRequest(

        @NotNull
        Long classId,

        @NotNull
        Long classroomId,

        @NotNull
        @Min(1)
        @Max(7)
        Integer weekday,

        @NotNull
        LocalTime startTime,

        @NotNull
        LocalTime endTime,

        @NotNull
        LocalDate validFrom,

        @NotNull
        LocalDate validUntil

) {
}
