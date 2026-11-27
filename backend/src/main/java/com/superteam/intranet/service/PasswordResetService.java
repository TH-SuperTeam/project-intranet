package com.superteam.intranet.service;

import com.superteam.intranet.model.PasswordResetToken;
import com.superteam.intranet.model.User;
import com.superteam.intranet.repository.PasswordResetTokenRepository;
import com.superteam.intranet.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HexFormat;
import java.util.List;


@Service
public class PasswordResetService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private static final Logger log = LoggerFactory.getLogger(PasswordResetService.class);
    private final long expirationMinutes;
    private final String frontendUrl;

    private static final SecureRandom secureRandom = new SecureRandom();


    public PasswordResetService(UserRepository userRepository, PasswordResetTokenRepository passwordResetTokenRepository, PasswordEncoder passwordEncoder, @Value("${password-reset.expiration-minutes}") long expirationMinutes,
                                @Value("${app.frontend-url}") String frontendUrl) {
        this.userRepository = userRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.expirationMinutes = expirationMinutes;
        this.frontendUrl = frontendUrl;
    }

    @Transactional
    public void requestReset(String email) {

        String normalizedEmail = email.trim().toLowerCase();

        User user = userRepository.findByEmailIgnoreCase(normalizedEmail).orElse(null);

        if (user == null || !user.isActive()) {
            return;
        }
        List<PasswordResetToken> oldTokens = passwordResetTokenRepository.findByUserAndUsedFalse(user);
        for (PasswordResetToken oldToken : oldTokens) {
            oldToken.setUsed(true);
        }
        passwordResetTokenRepository.saveAll(oldTokens);

        String rawToken = generateToken();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setUser(user);
        resetToken.setTokenHash(hashToken(rawToken));
        resetToken.setExpiresAt(LocalDateTime.now().plusMinutes(expirationMinutes));

        passwordResetTokenRepository.save(resetToken);

        log.info("Återställningslänk för {}: {}/reset-password?token={}",
                user.getEmail(), frontendUrl, rawToken);

    }

    @Transactional
    public void resetPassword(String token, String newPassword) {

        PasswordResetToken resetToken = checkToken(token);

        User user = resetToken.getUser();

        user.setPasswordHash(passwordEncoder.encode(newPassword));
        resetToken.setUsed(true);

        userRepository.save(user);
        passwordResetTokenRepository.save(resetToken);
    }

    private ResponseStatusException invalidToken() {
        return new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Länken är ogiltig eller har gått ut. Begär en ny länk."
        );
    }

    // Skapar en slumpad, oskyddad token som skickas i återställningslänken.
    private String generateToken() {
        byte[] bytes = new byte[32];
        secureRandom.nextBytes(bytes);

        // URL-säker text utan "=" på slutet, så att den fungerar i en länk
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    // Hashar token med SHA-256 innan den sparas. Samma token ger alltid
    // samma hash, så vi kan slå upp den i databasen utan att spara klartexten.
    private String hashToken(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            // Gör om texten till 32 byte hash
            byte[] hash = digest.digest(token.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException e) {
            // SHA-256 finns alltid i Java, men kompilatorn kräver att vi hanterar det
            throw new IllegalStateException("SHA-256 finns inte tillgängligt", e);
        }
    }

    private PasswordResetToken checkToken(String token) {
        String tokenHash = hashToken(token);

        PasswordResetToken resetToken = passwordResetTokenRepository
                .findByTokenHash(tokenHash)
                .orElseThrow(this::invalidToken);

        User user = resetToken.getUser();

        // Samma felmeddelande oavsett orsak, så vi inte avslöjar vilka tokens som finns
        if (resetToken.isUsed()
                || LocalDateTime.now().isAfter(resetToken.getExpiresAt())
                || !user.isActive()) {
            throw invalidToken();
        }

        return resetToken;
    }
}
