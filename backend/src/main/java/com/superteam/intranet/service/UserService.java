
package com.superteam.intranet.service;

import com.superteam.intranet.dto.*;
import com.superteam.intranet.mapper.UserMapper;
import com.superteam.intranet.model.AccessRole;
import com.superteam.intranet.model.User;
import com.superteam.intranet.model.UserStatus;
import com.superteam.intranet.model.UserType;
import com.superteam.intranet.repository.UserRepository;
import com.superteam.intranet.exception.DuplicateEmailException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

    // Get current user's own profile
    public MyProfileResponse getMyProfile(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        return userMapper.toMyProfileResponse(user);
    }

    @Transactional
    public MyProfileResponse updateMyProfile(
            Long userId,
            UpdateProfileRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        String email = request.email().trim().toLowerCase();

        if (userRepository.existsByEmailIgnoreCaseAndIdNot(email, userId)) {
            throw new DuplicateEmailException("E-postadressen används redan");
        }

        user.setFirstName(request.firstName().trim());
        user.setLastName(request.lastName().trim());
        user.setEmail(email);
        user.setBio(request.bio() != null ? request.bio().trim() : null);
        user.setProfileImageUrl(request.profileImageUrl());

        User updatedUser = userRepository.save(user);

        return userMapper.toMyProfileResponse(updatedUser);
    }



    // Get another user's profile
    public UserProfileResponse getUserProfileById(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        return userMapper.toProfileResponse(user);
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

    public List<?> getUsers(String search, Long userId) {
        String term = (search == null) ? "" : search.trim();

        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException(
                        "Användaren hittades inte."
                ));

        List<User> users = currentUser.getAccessRole() == AccessRole.ADMIN
                ? userRepository.searchUsers(term)
                : userRepository.searchActiveUsers(term);

        if (currentUser.getAccessRole() == AccessRole.ADMIN) {
            return users.stream()
                    .map(userMapper::toListResponse)
                    .toList();
        } else {
            return users.stream()
                    .map(userMapper::toPublicUserResponse)
                    .toList();
        }
    }
}
