
package com.superteam.intranet.service;

import com.superteam.intranet.dto.ClassroomRequest;
import com.superteam.intranet.dto.ClassroomResponse;
import com.superteam.intranet.mapper.ClassroomMapper;
import com.superteam.intranet.model.Classroom;
import com.superteam.intranet.repository.ClassroomRepository;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ClassroomService {

    private final ClassroomRepository classroomRepository;

    public ClassroomService(ClassroomRepository classroomRepository) {
        this.classroomRepository = classroomRepository;
    }

    // Hämta alla klassrum
    @Transactional(readOnly = true)
    public List<ClassroomResponse> getAllClassrooms() {
        return classroomRepository.findAll()
                .stream()
                .map(ClassroomMapper::toResponse)
                .toList();
    }

    // Hämta ett klassrum via ID
    @Transactional(readOnly = true)
    public ClassroomResponse getClassroomById(Long id) {
        Classroom classroom = findClassroomById(id);
        return ClassroomMapper.toResponse(classroom);
    }

    // Skapa ett klassrum
    public ClassroomResponse createClassroom(ClassroomRequest request) {

        if (classroomRepository.existsByName(request.name())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Det finns redan ett klassrum med detta namn"
            );
        }

        Classroom classroom = ClassroomMapper.toEntity(request);

        try {
            Classroom savedClassroom =
                    classroomRepository.saveAndFlush(classroom);

            return ClassroomMapper.toResponse(savedClassroom);

        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Klassrummet kunde inte skapas på grund av en datakonflikt",
                    e
            );
        }
    }

    // Uppdatera ett klassrum
    public ClassroomResponse updateClassroom(
            Long id,
            ClassroomRequest request
    ) {
        Classroom classroom = findClassroomById(id);

        if (classroomRepository.existsByNameAndIdNot(request.name(), id)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Det finns redan ett klassrum med detta namn"
            );
        }

        classroom.setName(request.name());

        try {
            Classroom updatedClassroom =
                    classroomRepository.saveAndFlush(classroom);

            return ClassroomMapper.toResponse(updatedClassroom);

        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Klassrummet kunde inte uppdateras på grund av en datakonflikt",
                    e
            );
        }
    }

    // Ta bort ett klassrum
    @Transactional
    public void deleteClassroom(Long id) {
        Classroom classroom = findClassroomById(id);

        try {
            classroomRepository.delete(classroom);
            classroomRepository.flush();

        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Klassrummet kan inte tas bort eftersom det används i ett schema",
                    e
            );
        }
    }

    // Hjälpmetod: hitta klassrum
    private Classroom findClassroomById(Long id) {
        return classroomRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Klassrummet hittades inte"
                ));
    }
}
