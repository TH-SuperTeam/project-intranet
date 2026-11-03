package com.superteam.intranet.mapper;

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
                user.isActive(),
                user.getCreatedAt()
        );
    }
}