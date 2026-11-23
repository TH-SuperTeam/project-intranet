package com.superteam.intranet.mapper;

import com.superteam.intranet.dto.ScheduleOverrideRequest;
import com.superteam.intranet.dto.ScheduleOverrideResponse;
import com.superteam.intranet.model.Classroom;
import com.superteam.intranet.model.ScheduleOverride;
import com.superteam.intranet.model.WeeklySchedule;
import org.springframework.stereotype.Component;

@Component
public class ScheduleOverrideMapper {

    // Omvandlar Request till Entity
    public ScheduleOverride toEntity(
            ScheduleOverrideRequest request,
            WeeklySchedule weeklySchedule,
            Classroom classroom) {

        ScheduleOverride override = new ScheduleOverride();

        override.setWeeklySchedule(weeklySchedule);
        override.setClassroom(classroom);
        override.setOverrideType(request.overrideType());
        override.setStartTime(request.startTime());
        override.setEndTime(request.endTime());
        override.setValidFrom(request.validFrom());
        override.setValidUntil(request.validUntil());
        override.setNote(request.note());

        return override;
    }

    // Omvandlar Entity till Response
    public ScheduleOverrideResponse toResponse(ScheduleOverride override) {

        return new ScheduleOverrideResponse(
                override.getId(),
                override.getWeeklySchedule().getId(),
                override.getWeeklySchedule().getSchoolClass().getId(),
                override.getWeeklySchedule().getSchoolClass().getName(),
                override.getClassroom() != null ? override.getClassroom().getId() : null,
                override.getClassroom() != null ? override.getClassroom().getName() : null,
                override.getOverrideType(),
                override.getStartTime(),
                override.getEndTime(),
                override.getValidFrom(),
                override.getValidUntil(),
                override.getNote()
        );
    }
}