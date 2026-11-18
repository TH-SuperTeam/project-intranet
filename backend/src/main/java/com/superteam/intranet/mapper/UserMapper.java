
package com.superteam.intranet.mapper;

import com.superteam.intranet.dto.MyProfileResponse;
import com.superteam.intranet.dto.PublicUserResponse;
import com.superteam.intranet.dto.UserListResponse;
import com.superteam.intranet.dto.UserProfileResponse;
import com.superteam.intranet.dto.UserResponse;
import com.superteam.intranet.model.User;
import com.superteam.intranet.model.SchoolName;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getUserType(),
                user.getAccessRole(),
                user.getStatus(),
                user.getCreatedAt(),
                getSchool(user),
                getProgramId(user),
                getProgramName(user),
                getClassId(user),
                getClassName(user)
        );
    }

    public UserListResponse toListResponse(User user) {
        return new UserListResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getProfileImageUrl(),
                user.getUserType(),
                user.getAccessRole(),
                user.getStatus(),
                getSchool(user),
                getProgramId(user),
                getProgramName(user),
                getClassId(user),
                getClassName(user)
        );
    }

    public MyProfileResponse toMyProfileResponse(User user) {
        return new MyProfileResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getProfileImageUrl(),
                user.getUserType(),
                user.getBio(),
                user.getAccessRole(),
                user.getStatus(),
                user.getCreatedAt(),
                getSchool(user),
                getProgramId(user),
                getProgramName(user),
                getClassId(user),
                getClassName(user)
        );
    }

    public UserProfileResponse toProfileResponse(User user, boolean isAdmin) {
        return new UserProfileResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getProfileImageUrl(),
                user.getEmail(),
                user.getUserType(),
                user.getAccessRole(),
                isAdmin ? user.getStatus() : null,
                user.getBio(),
                getSchool(user),
                getProgramId(user),
                getProgramName(user),
                getClassId(user),
                getClassName(user)
        );
    }

    public PublicUserResponse toPublicUserResponse(User user) {
    return new PublicUserResponse(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getProfileImageUrl(),
            user.getUserType(),
            getSchool(user),
            getProgramName(user),
            getClassName(user)
    );
}


    // Hjälpmetoder för att mappa användarens skol- och utbildningstillhörighet.
    // Kontrollerar att relationerna finns innan information hämtas,
    // eftersom program och klass tillfälligt kan vara null under databasmigreringen.

    private SchoolName getSchool(User user) {
        return user.getProgram() != null
                ? user.getProgram().getSchool().getName()
                : null;
    }

    private Long getProgramId(User user) {
        return user.getProgram() != null
                ? user.getProgram().getId()
                : null;
    }

    private String getProgramName(User user) {
        return user.getProgram() != null
                ? user.getProgram().getName()
                : null;
    }

    private Long getClassId(User user) {
        return user.getSchoolClass() != null
                ? user.getSchoolClass().getId()
                : null;
    }

    private String getClassName(User user) {
        return user.getSchoolClass() != null
                ? user.getSchoolClass().getName()
                : null;
    }
}