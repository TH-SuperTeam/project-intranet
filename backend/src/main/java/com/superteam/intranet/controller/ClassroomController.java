
package com.superteam.intranet.controller;

import com.superteam.intranet.dto.ClassroomRequest;
import com.superteam.intranet.dto.ClassroomResponse;
import com.superteam.intranet.dto.ClassroomTodayResponse;
import com.superteam.intranet.service.ClassroomService;

import com.superteam.intranet.service.ClassroomTodayService;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classrooms")
public class ClassroomController {

    private final ClassroomService classroomService;
    private final ClassroomTodayService classroomTodayService;

    public ClassroomController(
            ClassroomService classroomService,
            ClassroomTodayService classroomTodayService) {
        this.classroomService = classroomService;
        this.classroomTodayService = classroomTodayService;
    }

    // Dagens klassrumsfördelning (publik endpoint)
    @GetMapping("/today")
    public ClassroomTodayResponse getToday() {
        return classroomTodayService.getToday();
    }

    // Hämta alla klassrum
    @GetMapping
    public List<ClassroomResponse> getAllClassrooms() {
        return classroomService.getAllClassrooms();
    }

    // Hämta ett klassrum via ID
    @GetMapping("/{id}")
    public ClassroomResponse getClassroomById(@PathVariable Long id) {
        return classroomService.getClassroomById(id);
    }

    // Skapa ett klassrum
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ClassroomResponse createClassroom(
            @Valid @RequestBody ClassroomRequest request
    ) {
        return classroomService.createClassroom(request);
    }

    // Uppdatera ett klassrum
    @PutMapping("/{id}")
    public ClassroomResponse updateClassroom(
            @PathVariable Long id,
            @Valid @RequestBody ClassroomRequest request
    ) {
        return classroomService.updateClassroom(id, request);
    }

    // Ta bort ett klassrum
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteClassroom(@PathVariable Long id) {
        classroomService.deleteClassroom(id);
    }
}
