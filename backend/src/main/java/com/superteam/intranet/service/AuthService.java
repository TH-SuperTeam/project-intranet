package com.superteam.intranet.service;

import com.superteam.intranet.dto.LoginRequest;
import com.superteam.intranet.dto.LoginResponse;
import com.superteam.intranet.model.User;
import com.superteam.intranet.repository.UserRepository;
import com.superteam.intranet.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {

        // Hitta användaren via e-postadress.
        User user = userRepository
                .findByEmailIgnoreCase(request.email().trim())
                .orElseThrow(this::invalidCredentials);

        // Kontrollera att kontot är aktivt
        // och att lösenordet stämmer.
        if (!user.isActive()
                || !passwordEncoder.matches(
                request.password(),
                user.getPasswordHash())) {

            throw invalidCredentials();
        }

        // Skapa JWT för användaren.
        String token = jwtService.generateToken(user);

        return new LoginResponse(token, "Bearer");
    }

    private ResponseStatusException invalidCredentials() {

        return new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Invalid email or password"
        );
    }
}
