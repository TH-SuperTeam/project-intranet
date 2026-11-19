package com.superteam.intranet.controller;

import com.superteam.intranet.dto.ScheduleOverrideRequest;
import com.superteam.intranet.dto.ScheduleOverrideResponse;
import com.superteam.intranet.service.ScheduleOverrideService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

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

    // Skapa schemaändring
    @PostMapping
    public ScheduleOverrideResponse createOverride(
            @Valid @RequestBody ScheduleOverrideRequest request) {

        return scheduleOverrideService.createOverride(request);
    }


    // Uppdatera schemaändring
    @PutMapping("/{id}")
    public ScheduleOverrideResponse updateOverride(
            @PathVariable Long id,
            @Valid @RequestBody ScheduleOverrideRequest request) {
        return scheduleOverrideService.updateOverride(id, request);
    }
}
