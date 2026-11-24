package com.superteam.intranet.repository;

import com.superteam.intranet.model.SchoolClass;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface SchoolClassRepository extends JpaRepository<SchoolClass, Long> {
    // Hämta alla klasser för en utbildning
    List<SchoolClass> findByProgramId(Long programId);

    // Kontrollera om en utbildning har klasser
    boolean existsByProgramId(Long programId);

    // Kontrollera dubbletter vid skapande
    boolean existsByProgramIdAndStartDate(
            Long programId,
            LocalDate startDate
    );

    // Kontrollera dubbletter vid uppdatering
    boolean existsByProgramIdAndStartDateAndIdNot(
            Long programId,
            LocalDate startDate,
            Long id
    );

    // Hämta aktiva klasser inom aktiva program
    List<SchoolClass> findByIsActiveTrueAndProgram_IsActiveTrue();

    // Hämta aktiva klasser för ett specifikt aktivt program
    List<SchoolClass> findByProgramIdAndIsActiveTrueAndProgram_IsActiveTrue(
            Long programId
    );
}