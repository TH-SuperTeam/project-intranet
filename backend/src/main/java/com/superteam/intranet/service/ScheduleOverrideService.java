package com.superteam.intranet.service;

import com.superteam.intranet.mapper.ScheduleOverrideMapper;
import com.superteam.intranet.repository.ClassroomRepository;
import com.superteam.intranet.repository.ScheduleOverrideRepository;
import com.superteam.intranet.repository.WeeklyScheduleRepository;
import org.springframework.stereotype.Service;

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
}
