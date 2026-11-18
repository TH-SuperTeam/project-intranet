package com.superteam.intranet.repository;

import com.superteam.intranet.model.WeeklySchedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeeklyScheduleRepository extends JpaRepository<WeeklySchedule, Long> {
}
