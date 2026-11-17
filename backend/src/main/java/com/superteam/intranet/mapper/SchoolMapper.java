package com.superteam.intranet.mapper;

import com.superteam.intranet.dto.SchoolResponse;
import com.superteam.intranet.model.School;

public class SchoolMapper {

    public static SchoolResponse toResponse(School school) {
        return new SchoolResponse(
                school.getId(),
                school.getName()
        );
    }
}