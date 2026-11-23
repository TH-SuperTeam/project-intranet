package com.superteam.intranet.service;

import com.superteam.intranet.dto.WeeklyScheduleRequest;
import com.superteam.intranet.dto.WeeklyScheduleResponse;
import com.superteam.intranet.mapper.WeeklyScheduleMapper;
import com.superteam.intranet.model.Classroom;
import com.superteam.intranet.model.SchoolClass;
import com.superteam.intranet.model.WeeklySchedule;
import com.superteam.intranet.repository.ClassroomRepository;
import com.superteam.intranet.repository.SchoolClassRepository;
import com.superteam.intranet.repository.WeeklyScheduleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Comparator;
import java.util.List;

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

    // Hämta scheman, valfritt filtrerade på klass och/eller klassrum
    @Transactional(readOnly = true)
    public List<WeeklyScheduleResponse> getSchedules(Long classId, Long classroomId) {

        if (classId != null) {
            if (classId <= 0) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "classId måste vara ett positivt tal");
            }
            if (!schoolClassRepository.existsById(classId)) {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Klassen kunde inte hittas");
            }
        }

        if (classroomId != null) {
            if (classroomId <= 0) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "classroomId måste vara ett positivt tal");
            }
            if (!classroomRepository.existsById(classroomId)) {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Klassrummet kunde inte hittas");
            }
        }

        List<WeeklySchedule> schedules;

        if (classId != null && classroomId != null) {
            schedules = weeklyScheduleRepository
                    .findBySchoolClass_IdAndClassroom_Id(classId, classroomId);
        } else if (classId != null) {
            schedules = weeklyScheduleRepository.findBySchoolClass_Id(classId);
        } else if (classroomId != null) {
            schedules = weeklyScheduleRepository.findByClassroom_Id(classroomId);
        } else {
            schedules = weeklyScheduleRepository.findAll();
        }

        return schedules.stream()
                .sorted(Comparator.comparing(WeeklySchedule::getWeekday)
                        .thenComparing(WeeklySchedule::getStartTime))
                .map(weeklyScheduleMapper::toResponse)
                .toList();
    }

    @Transactional
    public WeeklyScheduleResponse createSchedule(WeeklyScheduleRequest request) {

        validateRequest(request);

        SchoolClass schoolClass = findClass(request.classId());
        Classroom classroom = findClassroom(request.classroomId());

        checkClassroomIsFree(request, classroom, null);

        WeeklySchedule schedule =
                weeklyScheduleMapper.toEntity(request, schoolClass, classroom);

        return weeklyScheduleMapper.toResponse(
                weeklyScheduleRepository.save(schedule));
    }

    @Transactional
    public WeeklyScheduleResponse updateSchedule(Long id, WeeklyScheduleRequest request) {

        WeeklySchedule schedule = weeklyScheduleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Schemaposten kunde inte hittas"));

        validateRequest(request);

        SchoolClass schoolClass = findClass(request.classId());
        Classroom classroom = findClassroom(request.classroomId());

        checkClassroomIsFree(request, classroom, id);

        schedule.setSchoolClass(schoolClass);
        schedule.setClassroom(classroom);
        schedule.setWeekday(request.weekday());
        schedule.setStartTime(request.startTime());
        schedule.setEndTime(request.endTime());
        schedule.setValidFrom(request.validFrom());
        schedule.setValidUntil(request.validUntil());

        return weeklyScheduleMapper.toResponse(
                weeklyScheduleRepository.save(schedule));
    }

    @Transactional
    public void deleteSchedule(Long id) {
        if (!weeklyScheduleRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Schemaposten kunde inte hittas");
        }
        weeklyScheduleRepository.deleteById(id);
    }

    // ==================== HELPERS ====================

    private void validateRequest(WeeklyScheduleRequest request) {
        if (!request.endTime().isAfter(request.startTime())) {
            throw new IllegalArgumentException("Sluttiden måste vara efter starttiden");
        }
        if (request.validUntil().isBefore(request.validFrom())) {
            throw new IllegalArgumentException(
                    "Slutdatumet måste vara samma som eller senare än startdatumet");
        }
    }

    private SchoolClass findClass(Long id) {
        return schoolClassRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Klassen kunde inte hittas"));
    }

    private Classroom findClassroom(Long id) {
        return classroomRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Klassrummet kunde inte hittas"));
    }

    private void checkClassroomIsFree(WeeklyScheduleRequest request,
                                      Classroom classroom,
                                      Long excludeId) {
        boolean booked = !weeklyScheduleRepository.findOverlapping(
                classroom.getId(),
                request.weekday(),
                request.startTime(),
                request.endTime(),
                request.validFrom(),
                request.validUntil(),
                excludeId
        ).isEmpty();

        if (booked) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Klassrummet är redan bokat under den valda tiden");
        }
    }
}