
package com.superteam.intranet.service;

import com.superteam.intranet.dto.MyProfileResponse;
import com.superteam.intranet.mapper.UserMapper;
import com.superteam.intranet.model.User;
import com.superteam.intranet.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    void getMyProfileShouldReturnUserProfile() {
        // Arrange
        User user = new User();

        MyProfileResponse expectedResponse = new MyProfileResponse(
                1L,
                "Anna",
                "Andersson",
                "anna@skolan.se",
                null,
                null,
                "My bio",
                null,
                null
        );

        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));

        when(userMapper.toMyProfileResponse(user))
                .thenReturn(expectedResponse);

        // Act
        MyProfileResponse response = userService.getMyProfile(1L);

        // Assert
        assertSame(expectedResponse, response);

        verify(userRepository).findById(1L);
        verify(userMapper).toMyProfileResponse(user);
    }

    @Test
    void getMyProfileShouldThrow404WhenUserDoesNotExist() {
        // Arrange
        when(userRepository.findById(999L))
                .thenReturn(Optional.empty());

        // Act
        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> userService.getMyProfile(999L)
        );

        // Assert
        assertEquals(404, exception.getStatusCode().value());
        assertEquals("User not found", exception.getReason());

        verifyNoInteractions(userMapper);
    }
}
