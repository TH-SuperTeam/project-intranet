package com.superteam.intranet.dto;

import com.superteam.intranet.model.SchoolName;
import java.time.LocalTime;

public record ClassroomBookingResponse(
        Long classId,
        String className,
        String programName,
        SchoolName school,
        LocalTime startTime,
        LocalTime endTime
) {}