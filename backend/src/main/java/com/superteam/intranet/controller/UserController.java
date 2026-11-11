package com.superteam.intranet.controller;

import com.superteam.intranet.dto.CreateUserRequest;
import com.superteam.intranet.dto.UpdateUserStatusRequest;
import com.superteam.intranet.dto.UserListResponse;
import com.superteam.intranet.dto.UserResponse;
import com.superteam.intranet.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins="http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserResponse> createUser(
            @Valid @RequestBody CreateUserRequest request) {

        UserResponse response = userService.createUser(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(
            Authentication authentication) {

        Long userId = (Long) authentication.getPrincipal();

        UserResponse response = userService.getUserById(userId);

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<UserResponse> updateUserStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserStatusRequest request) {

        UserResponse updatedUser = userService.updateUserStatus(id, request);

        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping
    public ResponseEntity<List<?>> getUsers(
            @RequestParam(required = false) String search, Authentication authentication) {

        Long userId = (Long) authentication.getPrincipal();

        return ResponseEntity.ok(userService.getUsers(search, userId));
    }
}