package com.superteam.intranet.repository;

import com.superteam.intranet.model.ScheduleOverride;
import org.springframework.data.jpa.repository.JpaRepository;


import java.time.LocalDate;
import java.util.List;

public interface ScheduleOverrideRepository extends JpaRepository<ScheduleOverride, Long> {

    // Hämtar avvikelser för samma veckodag med överlappande giltighetsperiod
    List<ScheduleOverride> findByWeeklySchedule_WeekdayAndValidFromLessThanEqualAndValidUntilGreaterThanEqual(
            Integer weekday,
            LocalDate validUntil,
            LocalDate validFrom
    );

    // Hittar befintliga avvikelser för samma grundschema
    // som överlappar den nya avvikelsens giltighetsperiod.
    List<ScheduleOverride> findByWeeklySchedule_IdAndValidFromLessThanEqualAndValidUntilGreaterThanEqual(
            Long weeklyScheduleId,
            LocalDate validUntil,
            LocalDate validFrom
    );

}