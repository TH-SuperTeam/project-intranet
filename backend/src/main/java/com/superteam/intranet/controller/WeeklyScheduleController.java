package com.superteam.intranet.controller;

import com.superteam.intranet.dto.UserResponse;
import com.superteam.intranet.dto.WeeklyScheduleRequest;
import com.superteam.intranet.dto.WeeklyScheduleResponse;
import com.superteam.intranet.service.WeeklyScheduleService;
import com.superteam.intranet.service.UserService;
import com.superteam.intranet.model.UserType;
import com.superteam.intranet.model.AccessRole;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/weekly-schedules")
public class WeeklyScheduleController {

    private final WeeklyScheduleService weeklyScheduleService;
    private final UserService userService;

    public WeeklyScheduleController(WeeklyScheduleService weeklyScheduleService, UserService userService) {
        this.weeklyScheduleService = weeklyScheduleService;
        this.userService = userService;
    }


    // Skapa en ny schemapost
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WeeklyScheduleResponse createSchedule(
            @Valid @RequestBody WeeklyScheduleRequest request,
            Authentication authentication) {

        checkSchedulePermission(authentication);

        return weeklyScheduleService.createSchedule(request);
    }


    // Hämta alla schemaposter
    @GetMapping
    public List<WeeklyScheduleResponse> getAllSchedules() {

        return weeklyScheduleService.getAllSchedules();
    }


    // Ta bort en schemapost
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSchedule(
            @PathVariable Long id,
            Authentication authentication) {

        checkSchedulePermission(authentication);

        weeklyScheduleService.deleteSchedule(id);
    }


    // Hjälpfunktion som kontrollerar behörigheten
    private void checkSchedulePermission(Authentication authentication) {

        Long userId = (Long) authentication.getPrincipal();

        UserResponse user = userService.getUserById(userId);

        if (user.userType() != UserType.TEACHER
                && user.accessRole() != AccessRole.ADMIN) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Du har inte behörighet att administrera schemat"
            );
        }
    }
}