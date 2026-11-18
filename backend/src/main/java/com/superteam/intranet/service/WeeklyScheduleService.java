package com.superteam.intranet.service;

import com.superteam.intranet.mapper.WeeklyScheduleMapper;
import com.superteam.intranet.repository.ClassroomRepository;
import com.superteam.intranet.repository.SchoolClassRepository;
import com.superteam.intranet.repository.WeeklyScheduleRepository;
import com.superteam.intranet.dto.WeeklyScheduleRequest;
import com.superteam.intranet.dto.WeeklyScheduleResponse;
import com.superteam.intranet.model.Classroom;
import com.superteam.intranet.model.SchoolClass;
import com.superteam.intranet.model.WeeklySchedule;
import org.springframework.stereotype.Service;

@Service
public class WeeklyScheduleService {

    private final WeeklyScheduleRepository weeklyScheduleRepository;
    private final SchoolClassRepository schoolClassRepository;
    private final ClassroomRepository classroomRepository;
    private final WeeklyScheduleMapper weeklyScheduleMapper;

    public WeeklyScheduleService(WeeklyScheduleRepository weeklyScheduleRepository,
            SchoolClassRepository schoolClassRepository,
             ClassroomRepository classroomRepository,
             WeeklyScheduleMapper weeklyScheduleMapper) {
        this.weeklyScheduleRepository = weeklyScheduleRepository;
        this.schoolClassRepository = schoolClassRepository;
        this.classroomRepository = classroomRepository;
        this.weeklyScheduleMapper = weeklyScheduleMapper;
    }



    public WeeklyScheduleResponse createSchedule(WeeklyScheduleRequest request) {

        // Kontrollera att sluttiden är efter starttiden
        if (!request.endTime().isAfter(request.startTime())) {
            throw new IllegalArgumentException(
                    "End time must be after start time"
            );
        }

        // Kontrollera giltighetsperioden
        if (request.validUntil().isBefore(request.validFrom())) {
            throw new IllegalArgumentException(
                    "Valid until must be after or equal to valid from"
            );
        }

        // Hämta klassen från databasen
        SchoolClass schoolClass = schoolClassRepository.findById(request.classId())
                .orElseThrow(() -> new RuntimeException("Class not found"));

        // Hämta klassrummet från databasen
        Classroom classroom = classroomRepository.findById(request.classroomId())
                .orElseThrow(() -> new RuntimeException("Classroom not found"));

        // Omvandla request till entity
        WeeklySchedule schedule = weeklyScheduleMapper.toEntity(
                request,
                schoolClass,
                classroom
        );

        // Spara schemat i databasen
        WeeklySchedule savedSchedule = weeklyScheduleRepository.save(schedule);

        // Omvandla entity till response och returnera
        return weeklyScheduleMapper.toResponse(savedSchedule);
    }


}
