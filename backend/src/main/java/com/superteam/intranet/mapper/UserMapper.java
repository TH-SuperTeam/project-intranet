
package com.superteam.intranet.mapper;

import com.superteam.intranet.dto.MyProfileResponse;
import com.superteam.intranet.dto.PublicUserResponse;
import com.superteam.intranet.dto.UserListResponse;
import com.superteam.intranet.dto.UserProfileResponse;
import com.superteam.intranet.dto.UserResponse;
import com.superteam.intranet.model.User;
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
                user.getCreatedAt()
        );
    }

    public UserListResponse toListResponse(User user) {
        return new UserListResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getUserType(),
                user.getAccessRole(),
                user.getStatus()
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
                user.getCreatedAt()
        );
    }

    public UserProfileResponse toProfileResponse(User user) {
        return new UserProfileResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getProfileImageUrl(),
                user.getEmail(),
                user.getUserType(),
                user.getBio()
        );
    }

    public PublicUserResponse toPublicUserResponse(User user) {
        return new PublicUserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getProfileImageUrl(),
                user.getUserType()
        );
    }
}
