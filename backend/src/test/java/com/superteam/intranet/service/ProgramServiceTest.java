package com.superteam.intranet.service;

import com.superteam.intranet.model.Program;
import com.superteam.intranet.repository.ProgramRepository;
import com.superteam.intranet.repository.SchoolClassRepository;
import com.superteam.intranet.repository.SchoolRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProgramServiceTest {

    @Mock
    private ProgramRepository programRepository;

    @Mock
    private SchoolRepository schoolRepository;

    @Mock
    private SchoolClassRepository schoolClassRepository;

    @InjectMocks
    private ProgramService programService;

    @Test
    void shouldDeleteProgramWithoutDependencies() {
        Program program = new Program();

        when(programRepository.findById(1L))
                .thenReturn(Optional.of(program));

        when(schoolClassRepository.existsByProgramId(1L))
                .thenReturn(false);

        programService.deleteProgram(1L);

        verify(programRepository).delete(program);
        verify(programRepository).flush();
    }

    @Test
    void shouldNotDeleteProgramWithClasses() {
        Program program = new Program();

        when(programRepository.findById(1L))
                .thenReturn(Optional.of(program));

        when(schoolClassRepository.existsByProgramId(1L))
                .thenReturn(true);

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> programService.deleteProgram(1L)
        );

        assertEquals(HttpStatus.CONFLICT, exception.getStatusCode());

        verify(programRepository, never()).delete(any(Program.class));
    }

    @Test
    void shouldReturnConflictWhenDatabaseBlocksDeletion() {
        Program program = new Program();

        when(programRepository.findById(1L))
                .thenReturn(Optional.of(program));

        when(schoolClassRepository.existsByProgramId(1L))
                .thenReturn(false);

        doThrow(new DataIntegrityViolationException("Foreign key constraint"))
                .when(programRepository).flush();

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> programService.deleteProgram(1L)
        );

        assertEquals(HttpStatus.CONFLICT, exception.getStatusCode());
    }

    @Test
    void shouldReturnNotFoundWhenProgramDoesNotExist() {
        when(programRepository.findById(1L))
                .thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> programService.deleteProgram(1L)
        );

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
    }
}