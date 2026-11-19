package com.superteam.intranet.service;

import com.superteam.intranet.dto.ScheduleOverrideResponse;
import com.superteam.intranet.mapper.ScheduleOverrideMapper;
import com.superteam.intranet.model.ScheduleOverride;
import com.superteam.intranet.repository.ClassroomRepository;
import com.superteam.intranet.repository.ScheduleOverrideRepository;
import com.superteam.intranet.repository.WeeklyScheduleRepository;
import org.springframework.stereotype.Service;

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


    public List<ScheduleOverrideResponse> getAllOverrides() {

        List<ScheduleOverride> overrides = scheduleOverrideRepository.findAll();

        return overrides.stream()
                .map(scheduleOverrideMapper::toResponse)
                .collect(Collectors.toList());
    }

}
