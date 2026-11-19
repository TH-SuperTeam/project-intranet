package com.superteam.intranet.service;

import com.superteam.intranet.dto.ScheduleOverrideResponse;
import com.superteam.intranet.mapper.ScheduleOverrideMapper;
import com.superteam.intranet.model.Classroom;
import com.superteam.intranet.model.ScheduleOverride;
import com.superteam.intranet.model.WeeklySchedule;
import com.superteam.intranet.repository.ClassroomRepository;
import com.superteam.intranet.repository.ScheduleOverrideRepository;
import com.superteam.intranet.repository.WeeklyScheduleRepository;
import com.superteam.intranet.dto.ScheduleOverrideRequest;
import com.superteam.intranet.model.OverrideType;
import java.time.DayOfWeek;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class ScheduleOverrideService {

    private final ScheduleOverrideRepository scheduleOverrideRepository;
    private final WeeklyScheduleRepository weeklyScheduleRepository;
    private final ClassroomRepository classroomRepository;
    private final ScheduleOverrideMapper scheduleOverrideMapper;

    public ScheduleOverrideService(
            ScheduleOverrideRepository scheduleOverrideRepository,
            WeeklyScheduleRepository weeklyScheduleRepository,
            ClassroomRepository classroomRepository,
            ScheduleOverrideMapper scheduleOverrideMapper) {

        this.scheduleOverrideRepository = scheduleOverrideRepository;
        this.weeklyScheduleRepository = weeklyScheduleRepository;
        this.classroomRepository = classroomRepository;
        this.scheduleOverrideMapper = scheduleOverrideMapper;
    }


    @Transactional(readOnly = true)
    public List<ScheduleOverrideResponse> getAllOverrides() {

        List<ScheduleOverride> overrides = scheduleOverrideRepository.findAll();

        return overrides.stream()
                .map(scheduleOverrideMapper::toResponse)
                .collect(Collectors.toList());
    }


    @Transactional
    public ScheduleOverrideResponse createOverride(
            ScheduleOverrideRequest request) {

        // Kontrollera att informationen är korrekt
        validateOverrideRequest(request);

        // Hämta grundschemat
        WeeklySchedule weeklySchedule =
                getWeeklySchedule(request.weeklyScheduleId());

        // Hämta klassrummet om ett ID har angetts
        Classroom classroom = getClassroom(request.classroomId());

        // Kontrollera att bokningen inte krockar med andra scheman
        validateNoWeeklyScheduleConflict(
                request,
                weeklySchedule,
                classroom,
                null
        );

        // Skapa entiteten och spara den
        ScheduleOverride override = scheduleOverrideMapper.toEntity(
                request,
                weeklySchedule,
                classroom
        );

        ScheduleOverride savedOverride =
                scheduleOverrideRepository.save(override);

        return scheduleOverrideMapper.toResponse(savedOverride);
    }


    @Transactional
    public ScheduleOverrideResponse updateOverride(
            Long id, ScheduleOverrideRequest request) {

        // Kontrollera att schemaändringen finns
        if (!scheduleOverrideRepository.existsById(id)) {
            throw new RuntimeException("Schemaändringen hittades inte");
        }

        validateOverrideRequest(request);

        WeeklySchedule weeklySchedule =
                getWeeklySchedule(request.weeklyScheduleId());

        Classroom classroom = getClassroom(request.classroomId());

        validateNoWeeklyScheduleConflict(
                request, weeklySchedule, classroom, id);

        ScheduleOverride updatedOverride =
                scheduleOverrideMapper.toEntity(
                        request, weeklySchedule, classroom);

        updatedOverride.setId(id);

        ScheduleOverride savedOverride =
                scheduleOverrideRepository.save(updatedOverride);

        return scheduleOverrideMapper.toResponse(savedOverride);
    }


    // Ta bort schemaändring
    @Transactional
    public void deleteOverride(Long id) {

        if (!scheduleOverrideRepository.existsById(id)) {
            throw new RuntimeException("Schemaändringen hittades inte");
        }

        scheduleOverrideRepository.deleteById(id);
    }


    // ==================== HELPER METHODS ====================

    // Hämtar grundschemat som avvikelsen ska tillhöra
    private WeeklySchedule getWeeklySchedule(Long id) {

        return weeklyScheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Grundschemat kunde inte hittas"
                ));
    }


    // Hämtar klassrummet om ett klassrums-ID har angetts
    private Classroom getClassroom(Long id) {

        if (id == null) {
            return null;
        }

        return classroomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Klassrummet kunde inte hittas"
                ));
    }


    // ==================== VALIDATION ====================

    // Validerar att avvikelsens datum, tider och typ har korrekta uppgifter
    // innan den sparas i databasen.
    private void validateOverrideRequest(ScheduleOverrideRequest request) {

        // Kontrollera giltighetsperioden
        if (request.validUntil().isBefore(request.validFrom())) {
            throw new IllegalArgumentException(
                    "Slutdatumet måste vara samma som eller senare än startdatumet"
            );
        }

        // Kontrollera att start- och sluttid anges tillsammans
        if ((request.startTime() == null) != (request.endTime() == null)) {
            throw new IllegalArgumentException(
                    "Både starttid och sluttid måste anges"
            );
        }

        // Kontrollera att sluttiden är efter starttiden
        if (request.startTime() != null
                && !request.endTime().isAfter(request.startTime())) {
            throw new IllegalArgumentException(
                    "Sluttiden måste vara efter starttiden"
            );
        }

        // Kontrollera vilken typ av avvikelse som skapas
        switch (request.overrideType()) {

            case CANCEL -> {
                if (request.classroomId() != null
                        || request.startTime() != null
                        || request.endTime() != null) {
                    throw new IllegalArgumentException(
                            "En CANCEL-avvikelse kan inte innehålla ändrat klassrum eller tider"
                    );
                }
            }

            case MODIFY -> {
                if (request.classroomId() == null
                        && request.startTime() == null) {
                    throw new IllegalArgumentException(
                            "En MODIFY-avvikelse måste ändra klassrum eller tider"
                    );
                }
            }

            case ADD_ROOM -> {
                if (request.classroomId() == null) {
                    throw new IllegalArgumentException(
                            "Ett klassrum måste anges för ADD_ROOM"
                    );
                }
            }
        }
    }


    // ==================== BOOKING CONFLICTS ====================


    // Representerar en faktisk bokning av ett klassrum under en viss tid.
    private record RoomBooking(
            Long classroomId,
            LocalTime startTime,
            LocalTime endTime
    ) {}


    // Kontrollerar att avvikelsen innehåller minst en faktisk lektionsdag.
    private void validateContainsLessonDate(
            ScheduleOverrideRequest request,
            WeeklySchedule weeklySchedule) {

        LocalDate firstLessonDate = request.validFrom().with(
                TemporalAdjusters.nextOrSame(
                        DayOfWeek.of(weeklySchedule.getWeekday())
                )
        );

        if (firstLessonDate.isAfter(request.validUntil())) {
            throw new IllegalArgumentException(
                    "Det finns ingen schemalagd lektion under den valda perioden"
            );
        }
    }


    // Kontrollerar att avvikelsen inte överlappar en annan avvikelse
    // för samma grundschema på något faktiskt lektionsdatum.
    private void validateNoOverlappingOverride(
            ScheduleOverrideRequest request,
            WeeklySchedule weeklySchedule,
            Long excludeId) {

        List<ScheduleOverride> existingOverrides =
                scheduleOverrideRepository
                        .findByWeeklySchedule_IdAndValidFromLessThanEqualAndValidUntilGreaterThanEqual(
                                weeklySchedule.getId(),
                                request.validUntil(),
                                request.validFrom()
                        );

        boolean hasConflict = existingOverrides.stream()
                .filter(override -> !java.util.Objects.equals(
                        override.getId(), excludeId))
                .anyMatch(override -> {

                    LocalDate overlapStart = request.validFrom()
                            .isAfter(override.getValidFrom())
                            ? request.validFrom()
                            : override.getValidFrom();

                    LocalDate overlapEnd = request.validUntil()
                            .isBefore(override.getValidUntil())
                            ? request.validUntil()
                            : override.getValidUntil();

                    LocalDate firstLessonDate = overlapStart.with(
                            TemporalAdjusters.nextOrSame(
                                    DayOfWeek.of(weeklySchedule.getWeekday())
                            )
                    );

                    return !firstLessonDate.isAfter(overlapEnd);
                });

        if (hasConflict) {
            throw new IllegalArgumentException(
                    "Det finns redan en avvikelse för grundschemat under den valda perioden"
            );
        }
    }


    // Hämtar de faktiska klassrumsbokningarna för en ny avvikelse.
    private List<RoomBooking> getCandidateBookings(
            ScheduleOverrideRequest request,
            WeeklySchedule weeklySchedule,
            Classroom classroom) {

        List<RoomBooking> bookings = new ArrayList<>();

        switch (request.overrideType()) {

            case CANCEL -> {
                // Ingen undervisning sker.
            }

            case MODIFY -> {
                Long classroomId = classroom != null
                        ? classroom.getId()
                        : weeklySchedule.getClassroom().getId();

                LocalTime startTime = request.startTime() != null
                        ? request.startTime()
                        : weeklySchedule.getStartTime();

                LocalTime endTime = request.endTime() != null
                        ? request.endTime()
                        : weeklySchedule.getEndTime();

                bookings.add(new RoomBooking(
                        classroomId,
                        startTime,
                        endTime
                ));
            }

            case ADD_ROOM -> {
                // Det ordinarie klassrummet behålls.
                bookings.add(new RoomBooking(
                        weeklySchedule.getClassroom().getId(),
                        weeklySchedule.getStartTime(),
                        weeklySchedule.getEndTime()
                ));

                // Det extra klassrummet får egna tider om sådana anges.
                LocalTime startTime = request.startTime() != null
                        ? request.startTime()
                        : weeklySchedule.getStartTime();

                LocalTime endTime = request.endTime() != null
                        ? request.endTime()
                        : weeklySchedule.getEndTime();

                bookings.add(new RoomBooking(
                        classroom.getId(),
                        startTime,
                        endTime
                ));
            }
        }

        return bookings;
    }


    // Hämtar de faktiska klassrumsbokningarna för ett befintligt grundschema
    // med hänsyn till eventuell avvikelse på det aktuella lektionsdatumet.
    private List<RoomBooking> getEffectiveBookings(
            WeeklySchedule weeklySchedule,
            LocalDate lessonDate,
            List<ScheduleOverride> overrides) {

        List<ScheduleOverride> applicableOverrides = overrides.stream()
                .filter(override -> override.getWeeklySchedule().getId()
                        .equals(weeklySchedule.getId()))
                .filter(override ->
                        !lessonDate.isBefore(override.getValidFrom())
                                && !lessonDate.isAfter(override.getValidUntil()))
                .collect(Collectors.toList());

        if (applicableOverrides.size() > 1) {
            throw new IllegalStateException(
                    "Flera avvikelser påverkar samma lektionsdatum"
            );
        }

        // Om ingen avvikelse finns gäller grundschemat.
        if (applicableOverrides.isEmpty()) {
            return List.of(new RoomBooking(
                    weeklySchedule.getClassroom().getId(),
                    weeklySchedule.getStartTime(),
                    weeklySchedule.getEndTime()
            ));
        }

        ScheduleOverride override = applicableOverrides.get(0);

        List<RoomBooking> bookings = new ArrayList<>();

        switch (override.getOverrideType()) {

            case CANCEL -> {
                // Lektionen är inställd.
            }

            case MODIFY -> {
                Long classroomId = override.getClassroom() != null
                        ? override.getClassroom().getId()
                        : weeklySchedule.getClassroom().getId();

                LocalTime startTime = override.getStartTime() != null
                        ? override.getStartTime()
                        : weeklySchedule.getStartTime();

                LocalTime endTime = override.getEndTime() != null
                        ? override.getEndTime()
                        : weeklySchedule.getEndTime();

                bookings.add(new RoomBooking(
                        classroomId,
                        startTime,
                        endTime
                ));
            }

            case ADD_ROOM -> {
                // Ordinarie bokning finns kvar.
                bookings.add(new RoomBooking(
                        weeklySchedule.getClassroom().getId(),
                        weeklySchedule.getStartTime(),
                        weeklySchedule.getEndTime()
                ));

                // Lägg till det extra klassrummet.
                LocalTime startTime = override.getStartTime() != null
                        ? override.getStartTime()
                        : weeklySchedule.getStartTime();

                LocalTime endTime = override.getEndTime() != null
                        ? override.getEndTime()
                        : weeklySchedule.getEndTime();

                bookings.add(new RoomBooking(
                        override.getClassroom().getId(),
                        startTime,
                        endTime
                ));
            }
        }

        return bookings;
    }


    // Kontrollerar om två bokningar använder samma klassrum
    // under överlappande tider.
    private boolean bookingsOverlap(
            RoomBooking first,
            RoomBooking second) {

        return first.classroomId().equals(second.classroomId())
                && first.startTime().isBefore(second.endTime())
                && first.endTime().isAfter(second.startTime());
    }


    // Kontrollerar att en ny avvikelse inte krockar med
    // andra grundscheman eller deras befintliga avvikelser.
    private void validateNoWeeklyScheduleConflict(
            ScheduleOverrideRequest request,
            WeeklySchedule weeklySchedule,
            Classroom classroom,
            Long excludeId) {

        // Avvikelsen måste ligga inom grundschemats giltighetsperiod.
        if (request.validFrom().isBefore(weeklySchedule.getValidFrom())
                || request.validUntil().isAfter(weeklySchedule.getValidUntil())) {
            throw new IllegalArgumentException(
                    "Avvikelsens giltighetsperiod måste ligga inom grundschemats giltighetsperiod"
            );
        }

        // Kontrollera att det finns minst en faktisk lektionsdag.
        validateContainsLessonDate(request, weeklySchedule);

        // Kontrollera att samma grundschema inte redan har en avvikelse
        // som påverkar något av samma lektionsdatum.
        validateNoOverlappingOverride(
                request,
                weeklySchedule,
                excludeId
        );

        // ADD_ROOM får inte ange det ordinarie klassrummet som extra rum.
        if (request.overrideType() == OverrideType.ADD_ROOM
                && classroom.getId().equals(
                weeklySchedule.getClassroom().getId())) {
            throw new IllegalArgumentException(
                    "Det extra klassrummet måste vara ett annat än det ordinarie klassrummet"
            );
        }

        // Hämta alla grundscheman med samma veckodag
        // som kan påverkas av den nya avvikelsen.
        List<WeeklySchedule> schedules =
                weeklyScheduleRepository
                        .findByWeekdayAndValidFromLessThanEqualAndValidUntilGreaterThanEqual(
                                weeklySchedule.getWeekday(),
                                request.validUntil(),
                                request.validFrom()
                        );

        // Hämta befintliga avvikelser för samma veckodag.
        List<ScheduleOverride> overrides =
                scheduleOverrideRepository
                        .findByWeeklySchedule_WeekdayAndValidFromLessThanEqualAndValidUntilGreaterThanEqual(
                                weeklySchedule.getWeekday(),
                                request.validUntil(),
                                request.validFrom()
                        );

        // Ta fram de faktiska bokningarna för den nya avvikelsen.
        List<RoomBooking> candidateBookings =
                getCandidateBookings(request, weeklySchedule, classroom);

        // Börja med det första datum som infaller på rätt veckodag.
        LocalDate lessonDate = request.validFrom().with(
                TemporalAdjusters.nextOrSame(
                        DayOfWeek.of(weeklySchedule.getWeekday())
                )
        );

        // Kontrollera varje faktisk lektionsdag under perioden.
        while (!lessonDate.isAfter(request.validUntil())) {

            for (WeeklySchedule otherSchedule : schedules) {

                // Vi jämför inte grundschemat med sig självt.
                if (otherSchedule.getId().equals(weeklySchedule.getId())) {
                    continue;
                }

                // Kontrollera att det andra grundschemat fortfarande gäller.
                if (lessonDate.isBefore(otherSchedule.getValidFrom())
                        || lessonDate.isAfter(otherSchedule.getValidUntil())) {
                    continue;
                }

                // Hämta de faktiska bokningarna för det andra schemat,
                // inklusive eventuella CANCEL, MODIFY och ADD_ROOM.
                List<RoomBooking> existingBookings =
                        getEffectiveBookings(
                                otherSchedule,
                                lessonDate,
                                overrides
                        );

                // Jämför varje ny bokning med varje befintlig bokning.
                for (RoomBooking candidate : candidateBookings) {
                    for (RoomBooking existing : existingBookings) {

                        if (bookingsOverlap(candidate, existing)) {
                            throw new IllegalArgumentException(
                                    "Klassrummet är redan bokat under den valda tiden"
                            );
                        }
                    }
                }
            }

            // Gå vidare till nästa vecka.
            lessonDate = lessonDate.plusWeeks(1);
        }
    }


}
