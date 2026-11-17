package com.superteam.intranet.repository;

import com.superteam.intranet.model.Program;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgramRepository extends JpaRepository<Program, Long> {
}