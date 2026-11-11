package com.superteam.intranet.service;

import com.superteam.intranet.dto.*;
import com.superteam.intranet.mapper.UserMapper;
import com.superteam.intranet.model.AccessRole;
import com.superteam.intranet.model.User;
import com.superteam.intranet.model.UserStatus;
import com.superteam.intranet.model.UserType;
import com.superteam.intranet.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.superteam.intranet.exception.DuplicateEmailException;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       UserMapper userMapper,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserResponse createUser(CreateUserRequest request) {

        String email = request.email().trim().toLowerCase();

        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new DuplicateEmailException("Email already exists");
        }

        if (request.userType() == UserType.STUDENT
                && request.accessRole() == AccessRole.ADMIN) {
            throw new IllegalArgumentException(
                    "A student cannot have admin access"
            );
        }

        User user = new User();

        user.setFirstName(request.firstName().trim());
        user.setLastName(request.lastName().trim());
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setUserType(request.userType());
        user.setAccessRole(request.accessRole());
        user.setStatus(UserStatus.ACTIVE);

        User savedUser = userRepository.save(user);

        return userMapper.toResponse(savedUser);
    }

    public UserResponse getUserById(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        return userMapper.toResponse(user);
    }

    public MyProfileResponse getMyProfile(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        return userMapper.toMyProfileResponse(user);
    }

    @Transactional
    public UserResponse updateUserStatus(
            Long userId,
            UpdateUserStatusRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        user.setStatus(request.status());

        User updatedUser = userRepository.save(user);

        return userMapper.toResponse(updatedUser);
    }

    public List<UserListResponse> getUsers(String search, Long userId) {
        String term = (search == null) ? "" : search.trim();

        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Användaren hittades inte."));

        List<User> users = currentUser.getAccessRole() == AccessRole.ADMIN
                ? userRepository.searchUsers(term)
                : userRepository.searchActiveUsers(term);

        return users.stream()
                .map(userMapper::toListResponse)
                .toList();
    }
}
