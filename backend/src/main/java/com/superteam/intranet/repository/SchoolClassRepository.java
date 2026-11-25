package com.superteam.intranet.repository;

import com.superteam.intranet.model.SchoolClass;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SchoolClassRepository extends JpaRepository<SchoolClass, Long> {
    // Hämta alla klasser för en utbildning
    List<SchoolClass> findByProgramId(Long programId);

    // Kontrollera om en utbildning har klasser
    boolean existsByProgramId(Long programId);

    // Kontrollera dubbletter vid skapande
    boolean existsByProgramIdAndNameIgnoreCase(
            Long programId,
            String name
    );

    // Kontrollera dubbletter vid uppdatering
    boolean existsByProgramIdAndNameIgnoreCaseAndIdNot(
            Long programId,
            String name,
            Long id
    );

    // Hämta aktiva klasser inom aktiva program
    List<SchoolClass> findByIsActiveTrueAndProgram_IsActiveTrue();

    // Hämta aktiva klasser för ett specifikt aktivt program
    List<SchoolClass> findByProgramIdAndIsActiveTrueAndProgram_IsActiveTrue(
            Long programId
    );
}