package com.superteam.intranet.repository;

import com.superteam.intranet.model.Program;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgramRepository extends JpaRepository<Program, Long> {
    boolean existsByNameAndSchoolId(String name, Long schoolId);

    boolean existsByNameAndSchoolIdAndIdNot(
            String name,
            Long schoolId,
            Long id
    );
}