
package com.superteam.intranet.controller;

import com.superteam.intranet.dto.SchoolClassRequest;
import com.superteam.intranet.dto.SchoolClassResponse;
import com.superteam.intranet.service.SchoolClassService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classes")
public class SchoolClassController {

    private final SchoolClassService schoolClassService;

    public SchoolClassController(SchoolClassService schoolClassService) {
        this.schoolClassService = schoolClassService;
    }

    // Hämta klasser med möjlighet att filtrera på utbildning och status
    @GetMapping
    public List<SchoolClassResponse> getAllClasses(
            @RequestParam(required = false) Long programId,
            @RequestParam(defaultValue = "false") boolean includeArchived
    ) {
        if (programId != null) {
            return schoolClassService.getClassesByProgramId(
                    programId,
                    includeArchived
            );
        }

        return schoolClassService.getAllClasses(includeArchived);
    }

    // Hämta en klass via ID
    @GetMapping("/{id}")
    public SchoolClassResponse getClassById(@PathVariable Long id) {
        return schoolClassService.getClassById(id);
    }

    // Skapa en klass
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SchoolClassResponse createClass(
            @Valid @RequestBody SchoolClassRequest request
    ) {
        return schoolClassService.createClass(request);
    }

    // Uppdatera en klass
    @PutMapping("/{id}")
    public SchoolClassResponse updateClass(
            @PathVariable Long id,
            @Valid @RequestBody SchoolClassRequest request
    ) {
        return schoolClassService.updateClass(id, request);
    }

    // Arkivera en klass
    @PatchMapping("/{id}/archive")
    public SchoolClassResponse archiveClass(@PathVariable Long id) {
        return schoolClassService.archiveClass(id);
    }

    // Återaktivera en klass
    @PatchMapping("/{id}/restore")
    public SchoolClassResponse restoreClass(@PathVariable Long id) {
        return schoolClassService.restoreClass(id);
    }

    // Ta bort en klass
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteClass(@PathVariable Long id) {
        schoolClassService.deleteClass(id);
    }
}
