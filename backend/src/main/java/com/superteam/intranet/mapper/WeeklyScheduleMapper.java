package com.superteam.intranet.mapper;

import com.superteam.intranet.dto.WeeklyScheduleResponse;
import com.superteam.intranet.dto.WeeklyScheduleRequest;
import com.superteam.intranet.model.Classroom;
import com.superteam.intranet.model.SchoolClass;
import com.superteam.intranet.model.WeeklySchedule;
import org.springframework.stereotype.Component;

@Component
public class WeeklyScheduleMapper {

    // Omvandlar Request till Entity
    public WeeklySchedule toEntity(
            WeeklyScheduleRequest request,
            SchoolClass schoolClass,
            Classroom classroom) {

        WeeklySchedule schedule = new WeeklySchedule();

        schedule.setSchoolClass(schoolClass);
        schedule.setClassroom(classroom);
        schedule.setWeekday(request.weekday());
        schedule.setStartTime(request.startTime());
        schedule.setEndTime(request.endTime());
        schedule.setValidFrom(request.validFrom());
        schedule.setValidUntil(request.validUntil());

        return schedule;
    }

    // Omvandlar Entity till Response
    public WeeklyScheduleResponse toResponse(WeeklySchedule schedule) {

        return new WeeklyScheduleResponse(
                schedule.getId(),
                schedule.getSchoolClass().getId(),
                schedule.getSchoolClass().getName(),
                schedule.getClassroom().getId(),
                schedule.getClassroom().getName(),
                schedule.getWeekday(),
                schedule.getStartTime(),
                schedule.getEndTime(),
                schedule.getValidFrom(),
                schedule.getValidUntil()
        );
    }
}
