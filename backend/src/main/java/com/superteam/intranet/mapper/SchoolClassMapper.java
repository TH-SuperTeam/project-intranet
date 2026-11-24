
package com.superteam.intranet.mapper;

import com.superteam.intranet.dto.SchoolClassRequest;
import com.superteam.intranet.dto.SchoolClassResponse;
import com.superteam.intranet.model.SchoolClass;
import com.superteam.intranet.model.Program;

public class SchoolClassMapper {

    // Entity -> Response DTO
    public static SchoolClassResponse toResponse(SchoolClass schoolClass) {
        return new SchoolClassResponse(
                schoolClass.getId(),
                schoolClass.getName(),
                schoolClass.getStartDate(),
                schoolClass.getEndDate(),
                schoolClass.getProgram().getId(),
                schoolClass.isActive()
        );
    }

    // Request DTO -> Entity
    public static SchoolClass toEntity(
            SchoolClassRequest request,
            Program program
    ) {
        SchoolClass schoolClass = new SchoolClass();

        schoolClass.setName(request.name());
        schoolClass.setStartDate(request.startDate());
        schoolClass.setEndDate(request.endDate());
        schoolClass.setProgram(program);

        return schoolClass;
    }
}
