
package com.superteam.intranet.service;

import com.superteam.intranet.dto.ProgramRequest;
import com.superteam.intranet.dto.ProgramResponse;
import com.superteam.intranet.mapper.ProgramMapper;
import com.superteam.intranet.model.Program;
import com.superteam.intranet.model.School;
import com.superteam.intranet.repository.ProgramRepository;
import com.superteam.intranet.repository.SchoolClassRepository;
import com.superteam.intranet.repository.SchoolRepository;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProgramService {

    private final ProgramRepository programRepository;
    private final SchoolRepository schoolRepository;
    private final SchoolClassRepository schoolClassRepository;

    public ProgramService(
            ProgramRepository programRepository,
            SchoolRepository schoolRepository,
            SchoolClassRepository schoolClassRepository
    ) {
        this.programRepository = programRepository;
        this.schoolRepository = schoolRepository;
        this.schoolClassRepository = schoolClassRepository;
    }

    // Hämta alla utbildningar
    public List<ProgramResponse> getAllPrograms() {
        return programRepository.findAll()
                .stream()
                .map(ProgramMapper::toResponse)
                .toList();
    }

    // Hämta en utbildning via ID
    public ProgramResponse getProgramById(Long id) {
        Program program = findProgramById(id);
        return ProgramMapper.toResponse(program);
    }

    // Skapa en utbildning
    public ProgramResponse createProgram(ProgramRequest request) {
        School school = findSchoolById(request.schoolId());

        if (programRepository.existsByNameAndSchoolId(
                request.name(), request.schoolId())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Utbildningen finns redan på denna skola"
            );
        }

        Program program = ProgramMapper.toEntity(request, school);

        try {
            Program savedProgram = programRepository.saveAndFlush(program);
            return ProgramMapper.toResponse(savedProgram);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Utbildningen kunde inte skapas på grund av en datakonflikt",
                    e
            );
        }
    }

    // Uppdatera en utbildning
    public ProgramResponse updateProgram(Long id, ProgramRequest request) {
        Program program = findProgramById(id);
        School school = findSchoolById(request.schoolId());

        if (programRepository.existsByNameAndSchoolIdAndIdNot(
                request.name(), request.schoolId(), id)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Utbildningen finns redan på denna skola"
            );
        }

        program.setName(request.name());
        program.setSchool(school);

        try {
            Program updatedProgram = programRepository.saveAndFlush(program);
            return ProgramMapper.toResponse(updatedProgram);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Utbildningen kunde inte uppdateras på grund av en datakonflikt",
                    e
            );
        }
    }

    // Ta bort en utbildning
    @Transactional
    public void deleteProgram(Long id) {
        Program program = findProgramById(id);

        if (schoolClassRepository.existsByProgramId(id)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Utbildningen kan inte tas bort eftersom den har kopplade klasser"
            );
        }

        try {
            programRepository.delete(program);
            programRepository.flush();
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Utbildningen kan inte tas bort eftersom den har kopplad data",
                    e
            );
        }
    }

    // Hjälpmetod: hitta utbildning
    private Program findProgramById(Long id) {
        return programRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Utbildningen hittades inte"
                ));
    }

    // Hjälpmetod: hitta skola
    private School findSchoolById(Long id) {
        return schoolRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Skolan hittades inte"
                ));
    }
}
