package com.superteam.intranet.security;

import com.superteam.intranet.model.User;
import com.superteam.intranet.repository.UserRepository;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            UserRepository userRepository) {

        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        // Hämta Authorization-headern.
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        // Om ingen Bearer-token finns går vi vidare.
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Ta bort "Bearer " så att vi bara får själva tokenen.
        String token = authHeader.substring(7).trim();

        try {
            // Kontrollera tokenens signatur och giltighetstid.
            if (!jwtService.isTokenValid(token)) {
                filterChain.doFilter(request, response);
                return;
            }

            // Hämta användarens ID från tokenen.
            Long userId = Long.valueOf(jwtService.extractUserId(token));

            // Hämta användaren från databasen.
            User user = userRepository.findById(userId).orElse(null);

            // Kontrollera att användaren finns och är aktiv.
            if (user == null || !user.isActive()) {
                filterChain.doFilter(request, response);
                return;
            }

            // Hämta aktuell behörighet från databasen.
            var authorities = List.of(
                    new SimpleGrantedAuthority(
                            "ROLE_" + user.getAccessRole().name()
                    )
            );

            // Skapa en autentiserad användare för Spring Security.
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            user.getId(),
                            null,
                            authorities
                    );

            // Spara autentiseringen i SecurityContext.
            SecurityContextHolder.getContext()
                    .setAuthentication(authentication);

        } catch (JwtException | IllegalArgumentException exception) {

            // Ogiltig token ska inte ge någon autentisering.
            SecurityContextHolder.clearContext();
        }

        // Fortsätt till nästa filter.
        filterChain.doFilter(request, response);
    }
}
