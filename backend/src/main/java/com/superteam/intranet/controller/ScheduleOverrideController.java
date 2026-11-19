package com.superteam.intranet.controller;

import com.superteam.intranet.service.ScheduleOverrideService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/schedule-overrides")
public class ScheduleOverrideController {
    private final ScheduleOverrideService scheduleOverrideService;

    public ScheduleOverrideController(
            ScheduleOverrideService scheduleOverrideService) {
        this.scheduleOverrideService = scheduleOverrideService;
    }
}
