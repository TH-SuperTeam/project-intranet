package com.superteam.intranet.service;

import com.superteam.intranet.repository.WeeklyScheduleRepository;
import org.springframework.stereotype.Service;

@Service
public class WeeklyScheduleService {

    private final WeeklyScheduleRepository weeklyScheduleRepository;


    public WeeklyScheduleService(WeeklyScheduleRepository weeklyScheduleRepository) {
        this.weeklyScheduleRepository = weeklyScheduleRepository;

    }
}
