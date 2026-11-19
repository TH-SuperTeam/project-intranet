package com.superteam.intranet.controller;

import com.superteam.intranet.dto.ScheduleOverrideResponse;
import com.superteam.intranet.dto.WeeklyScheduleResponse;
import com.superteam.intranet.service.ScheduleOverrideService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/schedule-overrides")
public class ScheduleOverrideController {
    private final ScheduleOverrideService scheduleOverrideService;

    public ScheduleOverrideController(
            ScheduleOverrideService scheduleOverrideService) {
        this.scheduleOverrideService = scheduleOverrideService;
    }

    // Hämta alla schemaändringar
    @GetMapping
    public List<ScheduleOverrideResponse> getAllOverrides() {
        return scheduleOverrideService.getAllOverrides();
    }
}
