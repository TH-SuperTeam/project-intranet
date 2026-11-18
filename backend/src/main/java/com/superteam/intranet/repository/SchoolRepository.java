package com.superteam.intranet.repository;

import com.superteam.intranet.model.School;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SchoolRepository extends JpaRepository<School, Long> {
}