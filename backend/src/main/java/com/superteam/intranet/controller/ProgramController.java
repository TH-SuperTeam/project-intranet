
package com.superteam.intranet.controller;

import com.superteam.intranet.dto.ProgramRequest;
import com.superteam.intranet.dto.ProgramResponse;
import com.superteam.intranet.service.ProgramService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/programs")
public class ProgramController {

    private final ProgramService programService;

    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    // Hämta alla utbildningar
    @GetMapping
    public List<ProgramResponse> getAllPrograms() {
        return programService.getAllPrograms();
    }

    // Hämta en utbildning via ID
    @GetMapping("/{id}")
    public ProgramResponse getProgramById(@PathVariable Long id) {
        return programService.getProgramById(id);
    }

    // Skapa en utbildning
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProgramResponse createProgram(
            @Valid @RequestBody ProgramRequest request
    ) {
        return programService.createProgram(request);
    }

    // Uppdatera en utbildning
    @PutMapping("/{id}")
    public ProgramResponse updateProgram(
            @PathVariable Long id,
            @Valid @RequestBody ProgramRequest request
    ) {
        return programService.updateProgram(id, request);
    }

    // Ta bort en utbildning
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProgram(@PathVariable Long id) {
        programService.deleteProgram(id);
    }
}
