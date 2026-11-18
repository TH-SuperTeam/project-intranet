package com.superteam.intranet.repository;

import com.superteam.intranet.model.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassroomRepository extends JpaRepository<Classroom, Long> {
    // Kontrollera dubbletter vid skapande
    boolean existsByName(String name);

    // Kontrollera dubbletter vid uppdatering
    boolean existsByNameAndIdNot(String name, Long id);
}