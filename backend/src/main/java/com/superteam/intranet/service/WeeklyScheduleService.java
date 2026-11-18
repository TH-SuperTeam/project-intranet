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

import java.util.List;
import java.util.stream.Collectors;

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

    public List<WeeklyScheduleResponse> getAllSchedules() {

        List<WeeklySchedule> schedules = weeklyScheduleRepository.findAll();

        return schedules.stream()
                .map(weeklyScheduleMapper::toResponse)
                .collect(Collectors.toList());
    }

    public WeeklyScheduleResponse createSchedule(WeeklyScheduleRequest request) {

        // Kontrollera att sluttiden är efter starttiden
        if (!request.endTime().isAfter(request.startTime())) {
            throw new IllegalArgumentException(
                    "Sluttiden måste vara efter starttiden"
            );
        }

        // Kontrollera giltighetsperioden
        if (request.validUntil().isBefore(request.validFrom())) {
            throw new IllegalArgumentException(
                    "Slutdatumet måste vara samma som eller senare än startdatumet"
            );
        }

        // Hämta klassen från databasen
        SchoolClass schoolClass = schoolClassRepository.findById(request.classId())
                .orElseThrow(() -> new RuntimeException("Klassen kunde inte hittas"));

        // Hämta klassrummet från databasen
        Classroom classroom = classroomRepository.findById(request.classroomId())
                .orElseThrow(() -> new RuntimeException("Klassrum kunde inte hittas"));

        // Kontrollera om klassrummet redan är bokat
        boolean classroomBooked = !weeklyScheduleRepository.findOverlapping(
                classroom.getId(),
                request.weekday(),
                request.startTime(),
                request.endTime(),
                request.validFrom(),
                request.validUntil(),
                null
        ).isEmpty();

        if (classroomBooked) {
            throw new IllegalArgumentException(
                    "Klassrummet är redan bokat under den valda tiden"
            );
        }

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


    public WeeklyScheduleResponse updateSchedule(Long id, WeeklyScheduleRequest request) {

        WeeklySchedule schedule = weeklyScheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schemaposten kunde inte hittas"));

        if (!request.endTime().isAfter(request.startTime())) {
            throw new IllegalArgumentException("Sluttiden måste vara efter starttiden");
        }

        if (request.validUntil().isBefore(request.validFrom())) {
            throw new IllegalArgumentException(
                    "Slutdatumet måste vara samma som eller senare än startdatumet"
            );
        }

        SchoolClass schoolClass = schoolClassRepository.findById(request.classId())
                .orElseThrow(() -> new RuntimeException("Klassen kunde inte hittas"));

        Classroom classroom = classroomRepository.findById(request.classroomId())
                .orElseThrow(() -> new RuntimeException("Klassrum kunde inte hittas"));

        boolean classroomBooked = !weeklyScheduleRepository.findOverlapping(
                classroom.getId(),
                request.weekday(),
                request.startTime(),
                request.endTime(),
                request.validFrom(),
                request.validUntil(),
                id
        ).isEmpty();

        if (classroomBooked) {
            throw new IllegalArgumentException(
                    "Klassrummet är redan bokat under den valda tiden"
            );
        }

        schedule.setSchoolClass(schoolClass);
        schedule.setClassroom(classroom);
        schedule.setWeekday(request.weekday());
        schedule.setStartTime(request.startTime());
        schedule.setEndTime(request.endTime());
        schedule.setValidFrom(request.validFrom());
        schedule.setValidUntil(request.validUntil());

        WeeklySchedule updatedSchedule = weeklyScheduleRepository.save(schedule);

        return weeklyScheduleMapper.toResponse(updatedSchedule);
    }


    public void deleteSchedule(Long id) {
        if (!weeklyScheduleRepository.existsById(id)) {
            throw new RuntimeException("Schemaposten kunde inte hittas");
        }

        weeklyScheduleRepository.deleteById(id);
    }

}
