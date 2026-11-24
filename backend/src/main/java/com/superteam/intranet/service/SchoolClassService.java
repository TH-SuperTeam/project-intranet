
package com.superteam.intranet.service;

import com.superteam.intranet.dto.SchoolClassRequest;
import com.superteam.intranet.dto.SchoolClassResponse;
import com.superteam.intranet.mapper.SchoolClassMapper;
import com.superteam.intranet.model.Program;
import com.superteam.intranet.model.SchoolClass;
import com.superteam.intranet.repository.ProgramRepository;
import com.superteam.intranet.repository.SchoolClassRepository;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
public class SchoolClassService {

    private final SchoolClassRepository schoolClassRepository;
    private final ProgramRepository programRepository;

    public SchoolClassService(
            SchoolClassRepository schoolClassRepository,
            ProgramRepository programRepository
    ) {
        this.schoolClassRepository = schoolClassRepository;
        this.programRepository = programRepository;
    }

    // Hämta klasser med möjlighet att inkludera arkiverade
    @Transactional(readOnly = true)
    public List<SchoolClassResponse> getAllClasses(boolean includeArchived) {
        List<SchoolClass> classes = includeArchived
                ? schoolClassRepository.findAll()
                : schoolClassRepository.findByIsActiveTrueAndProgram_IsActiveTrue();

        return classes.stream()
                .map(SchoolClassMapper::toResponse)
                .toList();
    }

    // Hämta klasser för en specifik utbildning
    @Transactional(readOnly = true)
    public List<SchoolClassResponse> getClassesByProgramId(
            Long programId,
            boolean includeArchived
    ) {
        findProgramById(programId);

        List<SchoolClass> classes = includeArchived
                ? schoolClassRepository.findByProgramId(programId)
                : schoolClassRepository
                .findByProgramIdAndIsActiveTrueAndProgram_IsActiveTrue(programId);

        return classes.stream()
                .map(SchoolClassMapper::toResponse)
                .toList();
    }

    // Hämta en klass via ID
    @Transactional(readOnly = true)
    public SchoolClassResponse getClassById(Long id) {
        SchoolClass schoolClass = findClassById(id);
        return SchoolClassMapper.toResponse(schoolClass);
    }

    // Skapa en klass
    public SchoolClassResponse createClass(SchoolClassRequest request) {
        validateDates(request.startDate(), request.endDate());

        Program program = findProgramById(request.programId());
        validateActiveProgram(program);

        if (schoolClassRepository.existsByProgramIdAndNameIgnoreCase(
                request.programId(), request.name().trim())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Det finns redan en klass med detta namn på utbildningen"
            );
        }

        SchoolClass schoolClass =
                SchoolClassMapper.toEntity(request, program);

        try {
            SchoolClass savedClass =
                    schoolClassRepository.saveAndFlush(schoolClass);

            return SchoolClassMapper.toResponse(savedClass);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Klassen kunde inte skapas på grund av en datakonflikt",
                    e
            );
        }
    }

    // Uppdatera en klass
    public SchoolClassResponse updateClass(
            Long id,
            SchoolClassRequest request
    ) {
        validateDates(request.startDate(), request.endDate());

        SchoolClass schoolClass = findClassById(id);
        Program program = findProgramById(request.programId());

        // Kontrollera att utbildningen är aktiv vid byte av utbildning
        if (!schoolClass.getProgram().getId().equals(request.programId())) {
            validateActiveProgram(program);
        }

        if (schoolClassRepository.existsByProgramIdAndNameIgnoreCase(
                request.programId(), request.name().trim())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Det finns redan en klass med detta namn på utbildningen"
            );
        }

        schoolClass.setName(request.name().trim());
        schoolClass.setStartDate(request.startDate());
        schoolClass.setEndDate(request.endDate());
        schoolClass.setProgram(program);

        try {
            SchoolClass updatedClass =
                    schoolClassRepository.saveAndFlush(schoolClass);

            return SchoolClassMapper.toResponse(updatedClass);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Klassen kunde inte uppdateras på grund av en datakonflikt",
                    e
            );
        }
    }

    // Arkivera en klass
    @Transactional
    public SchoolClassResponse archiveClass(Long id) {
        SchoolClass schoolClass = findClassById(id);

        schoolClass.setActive(false);

        return SchoolClassMapper.toResponse(schoolClass);
    }

    // Återaktivera en klass
    @Transactional
    public SchoolClassResponse restoreClass(Long id) {
        SchoolClass schoolClass = findClassById(id);

        schoolClass.setActive(true);

        return SchoolClassMapper.toResponse(schoolClass);
    }

    // Ta bort en klass
    @Transactional
    public void deleteClass(Long id) {
        SchoolClass schoolClass = findClassById(id);

        try {
            schoolClassRepository.delete(schoolClass);
            schoolClassRepository.flush();
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Klassen kan inte tas bort eftersom den har kopplade användare eller scheman",
                    e
            );
        }
    }

    // Hjälpmetod: hitta klass
    private SchoolClass findClassById(Long id) {
        return schoolClassRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Klassen hittades inte"
                ));
    }

    // Hjälpmetod: hitta utbildning
    private Program findProgramById(Long id) {
        return programRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Utbildningen hittades inte"
                ));
    }

    // Hjälpmetod: validera datum
    private void validateDates(LocalDate startDate, LocalDate endDate) {
        if (startDate != null
                && endDate != null
                && endDate.isBefore(startDate)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Slutdatum får inte vara före startdatum"
            );
        }
    }

    // Hjälpmetod: kontrollera att utbildningen är aktiv
    private void validateActiveProgram(Program program) {
        if (!program.isActive()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Utbildningen är arkiverad"
            );
        }
    }
}
