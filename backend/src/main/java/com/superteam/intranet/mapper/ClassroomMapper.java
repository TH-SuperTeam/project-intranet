
package com.superteam.intranet.mapper;

import com.superteam.intranet.dto.ClassroomRequest;
import com.superteam.intranet.dto.ClassroomResponse;
import com.superteam.intranet.model.Classroom;

public class ClassroomMapper {

    // Entity -> Response DTO
    public static ClassroomResponse toResponse(Classroom classroom) {
        return new ClassroomResponse(
                classroom.getId(),
                classroom.getName()
        );
    }

    // Request DTO -> Entity
    public static Classroom toEntity(ClassroomRequest request) {
        Classroom classroom = new Classroom();

        classroom.setName(request.name());

        return classroom;
    }
}
