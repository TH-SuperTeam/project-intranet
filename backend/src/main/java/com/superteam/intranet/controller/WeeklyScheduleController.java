package com.superteam.intranet.controller;

import com.superteam.intranet.dto.WeeklyScheduleRequest;
import com.superteam.intranet.dto.WeeklyScheduleResponse;
import com.superteam.intranet.service.WeeklyScheduleService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/weekly-schedules")
public class WeeklyScheduleController {

    private final WeeklyScheduleService weeklyScheduleService;

    public WeeklyScheduleController(WeeklyScheduleService weeklyScheduleService) {
        this.weeklyScheduleService = weeklyScheduleService;
    }

    // Skapa en ny schemapost
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WeeklyScheduleResponse createSchedule(
            @Valid @RequestBody WeeklyScheduleRequest request) {

        return weeklyScheduleService.createSchedule(request);
    }

    // Hämta alla schemaposter
    @GetMapping
    public List<WeeklyScheduleResponse> getAllSchedules() {

        return weeklyScheduleService.getAllSchedules();
    }
}