package com.superteam.intranet.controller;

import com.superteam.intranet.service.WeeklyScheduleService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/weekly-schedules")
public class WeeklyScheduleController {

    private final WeeklyScheduleService weeklyScheduleService;

    public WeeklyScheduleController(WeeklyScheduleService weeklyScheduleService) {
        this.weeklyScheduleService = weeklyScheduleService;
    }
}