package com.superteam.intranet.service;

import com.superteam.intranet.model.SchoolClass;
import com.superteam.intranet.repository.ProgramRepository;
import com.superteam.intranet.repository.SchoolClassRepository;

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
class SchoolClassServiceTest {

    @Mock
    private SchoolClassRepository schoolClassRepository;

    @Mock
    private ProgramRepository programRepository;

    @InjectMocks
    private SchoolClassService schoolClassService;

    @Test
    void shouldDeleteClassWithoutDependencies() {
        SchoolClass schoolClass = new SchoolClass();

        when(schoolClassRepository.findById(1L))
                .thenReturn(Optional.of(schoolClass));

        schoolClassService.deleteClass(1L);

        verify(schoolClassRepository).delete(schoolClass);
        verify(schoolClassRepository).flush();
    }

    @Test
    void shouldReturnConflictWhenDatabaseBlocksDeletion() {
        SchoolClass schoolClass = new SchoolClass();

        when(schoolClassRepository.findById(1L))
                .thenReturn(Optional.of(schoolClass));

        doThrow(new DataIntegrityViolationException("Foreign key constraint"))
                .when(schoolClassRepository).flush();

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> schoolClassService.deleteClass(1L)
        );

        assertEquals(HttpStatus.CONFLICT, exception.getStatusCode());
    }

    @Test
    void shouldReturnNotFoundWhenClassDoesNotExist() {
        when(schoolClassRepository.findById(1L))
                .thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> schoolClassService.deleteClass(1L)
        );

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());

        verify(schoolClassRepository, never())
                .delete(any(SchoolClass.class));
    }
}