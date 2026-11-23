package com.superteam.intranet.service;

import com.superteam.intranet.dto.ClassroomAvailability;
import com.superteam.intranet.dto.ClassroomBookingResponse;
import com.superteam.intranet.dto.ClassroomTodayResponse;
import com.superteam.intranet.model.Classroom;
import com.superteam.intranet.model.ScheduleOverride;
import com.superteam.intranet.model.WeeklySchedule;
import com.superteam.intranet.repository.ClassroomRepository;
import com.superteam.intranet.repository.ScheduleOverrideRepository;
import com.superteam.intranet.repository.WeeklyScheduleRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ClassroomTodayService {

    private final ClassroomRepository classroomRepository;
    private final WeeklyScheduleRepository weeklyScheduleRepository;
    private final ScheduleOverrideRepository scheduleOverrideRepository;
    private final Clock clock;

    public ClassroomTodayService(
            ClassroomRepository classroomRepository,
            WeeklyScheduleRepository weeklyScheduleRepository,
            ScheduleOverrideRepository scheduleOverrideRepository,
            Clock clock) {

        this.classroomRepository = classroomRepository;
        this.weeklyScheduleRepository = weeklyScheduleRepository;
        this.scheduleOverrideRepository = scheduleOverrideRepository;
        this.clock = clock;
    }

    // En bokning av ett klassrum under en viss tid
    private record Booking(Long classroomId, LocalTime startTime, LocalTime endTime) {}

    @Transactional(readOnly = true)
    public ClassroomTodayResponse getToday() {

        // Datum och tid enligt Europe/Stockholm (klockan i TimeConfig)
        LocalDateTime now = LocalDateTime.now(clock);
        LocalDate today = now.toLocalDate();
        LocalTime currentTime = now.toLocalTime();
        int weekday = today.getDayOfWeek().getValue(); // 1 = måndag ... 7 = söndag

        // Grundscheman som gäller idag
        List<WeeklySchedule> schedules = weeklyScheduleRepository
                .findByWeekdayAndValidFromLessThanEqualAndValidUntilGreaterThanEqual(
                        weekday, today, today);

        // Avvikelser som gäller idag
        List<ScheduleOverride> overrides = scheduleOverrideRepository
                .findByWeeklySchedule_WeekdayAndValidFromLessThanEqualAndValidUntilGreaterThanEqual(
                        weekday, today, today);

        Map<Long, ScheduleOverride> overrideByScheduleId = new HashMap<>();
        for (ScheduleOverride override : overrides) {
            overrideByScheduleId.putIfAbsent(
                    override.getWeeklySchedule().getId(), override);
        }

        // Samla dagens bokningar per klassrum
        Map<Long, List<ClassroomBookingResponse>> bookingsByClassroom = new HashMap<>();

        for (WeeklySchedule schedule : schedules) {

            ScheduleOverride override = overrideByScheduleId.get(schedule.getId());

            for (Booking booking : getEffectiveBookings(schedule, override)) {
                bookingsByClassroom
                        .computeIfAbsent(booking.classroomId(), id -> new ArrayList<>())
                        .add(new ClassroomBookingResponse(
                                schedule.getSchoolClass().getId(),
                                schedule.getSchoolClass().getName(),
                                booking.startTime(),
                                booking.endTime()
                        ));
            }
        }

        // Returnera ALLA klassrum, även de utan bokningar
        List<ClassroomTodayResponse.ClassroomStatus> result = new ArrayList<>();

        for (Classroom classroom : classroomRepository.findAll(Sort.by("name"))) {

            List<ClassroomBookingResponse> bookings = bookingsByClassroom
                    .getOrDefault(classroom.getId(), new ArrayList<>());

            bookings.sort(Comparator.comparing(ClassroomBookingResponse::startTime));

            boolean occupiedNow = bookings.stream().anyMatch(b ->
                    !currentTime.isBefore(b.startTime())
                            && currentTime.isBefore(b.endTime()));

            result.add(new ClassroomTodayResponse.ClassroomStatus(
                    classroom.getId(),
                    classroom.getName(),
                    occupiedNow ? ClassroomAvailability.OCCUPIED : ClassroomAvailability.FREE,
                    bookings
            ));
        }

        return new ClassroomTodayResponse(today, result);
    }

    // Räknar ut vad som faktiskt gäller idag för ett grundschema.
    // Ingen avvikelse = grundschemat gäller (så återgår det när avvikelsen upphört).
    private List<Booking> getEffectiveBookings(
            WeeklySchedule schedule,
            ScheduleOverride override) {

        List<Booking> bookings = new ArrayList<>();

        Long baseRoomId = schedule.getClassroom().getId();

        if (override == null) {
            bookings.add(new Booking(
                    baseRoomId, schedule.getStartTime(), schedule.getEndTime()));
            return bookings;
        }

        LocalTime start = override.getStartTime() != null
                ? override.getStartTime() : schedule.getStartTime();
        LocalTime end = override.getEndTime() != null
                ? override.getEndTime() : schedule.getEndTime();

        switch (override.getOverrideType()) {

            case CANCEL -> {
                // Lektionen är inställd, ingen bokning
            }

            case MODIFY -> {
                Long roomId = override.getClassroom() != null
                        ? override.getClassroom().getId() : baseRoomId;
                bookings.add(new Booking(roomId, start, end));
            }

            case ADD_ROOM -> {
                // Ordinarie rum behålls
                bookings.add(new Booking(
                        baseRoomId, schedule.getStartTime(), schedule.getEndTime()));
                // Plus det extra rummet
                bookings.add(new Booking(
                        override.getClassroom().getId(), start, end));
            }
        }

        return bookings;
    }
}