package com.superteam.intranet.dto;

import com.superteam.intranet.model.OverrideType;

import java.time.LocalDate;
import java.time.LocalTime;

public record ScheduleOverrideResponse (

        Long id,

        Long weeklyScheduleId,

        Long classId,
        String className,

        Long classroomId,
        String classroomName,

        OverrideType overrideType,

        LocalTime startTime,
        LocalTime endTime,

        LocalDate validFrom,
        LocalDate validUntil,

        String note
) {}
