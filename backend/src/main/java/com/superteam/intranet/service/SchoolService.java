package com.superteam.intranet.service;

import com.superteam.intranet.dto.SchoolResponse;
import com.superteam.intranet.mapper.SchoolMapper;
import com.superteam.intranet.repository.SchoolRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SchoolService {

    private final SchoolRepository schoolRepository;

    public SchoolService(SchoolRepository schoolRepository) {
        this.schoolRepository = schoolRepository;
    }

    public List<SchoolResponse> getAllSchools() {
        return schoolRepository.findAll()
                .stream()
                .map(SchoolMapper::toResponse)
                .toList();
    }
}