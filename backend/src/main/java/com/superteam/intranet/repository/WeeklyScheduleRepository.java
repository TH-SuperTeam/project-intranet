package com.superteam.intranet.repository;

import com.superteam.intranet.model.WeeklySchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface WeeklyScheduleRepository extends JpaRepository<WeeklySchedule, Long> {

    // Hittar befintliga schemaposter som krockar med en ny eller uppdaterad bokning
    @Query("""
    SELECT w FROM WeeklySchedule w
    WHERE w.classroom.id = :classroomId
      AND w.weekday = :weekday
      AND w.startTime < :endTime
      AND w.endTime > :startTime
      AND w.validFrom <= :validUntil
      AND w.validUntil >= :validFrom
      AND (:excludeId IS NULL OR w.id <> :excludeId)
    """)
    List<WeeklySchedule> findOverlapping(
            @Param("classroomId") Long classroomId,
            @Param("weekday") int weekday,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime,
            @Param("validFrom") LocalDate validFrom,
            @Param("validUntil") LocalDate validUntil,
            @Param("excludeId") Long excludeId
    );
}
