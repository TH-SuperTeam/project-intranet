package com.superteam.intranet.config;

import com.superteam.intranet.repository.UserRepository;
import com.superteam.intranet.security.JwtAuthenticationFilter;
import com.superteam.intranet.security.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public SecurityConfig(
            JwtService jwtService,
            UserRepository userRepository) {

        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                .cors(cors ->
                        cors.configurationSource(corsConfigurationSource())
                )

                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint((request, response, ex) ->
                                writeError(response, HttpStatus.UNAUTHORIZED,
                                        "Authentication is required."))
                        .accessDeniedHandler((request, response, ex) ->
                                writeError(response, HttpStatus.FORBIDDEN,
                                        "You do not have permission to perform this action."))
                )

                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/transport/departures").permitAll()

                        .requestMatchers(HttpMethod.POST, "/api/auth/logout")
                        .authenticated()

                        .requestMatchers("/api/auth/**").permitAll()

                        .requestMatchers(HttpMethod.PATCH, "/api/users/*/status")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/api/users")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/api/news/**")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.PUT, "/api/news/**")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.DELETE, "/api/news/**")
                        .hasRole("ADMIN")

                        .anyRequest().authenticated()
                )

                // Registrera JWT-filtret före Spring Securitys
                // vanliga autentiseringsfilter.
                .addFilterBefore(
                        new JwtAuthenticationFilter(
                                jwtService,
                                userRepository
                        ),
                        UsernamePasswordAuthenticationFilter.class
                )

                .formLogin(form -> form.disable())

                .httpBasic(basic -> basic.disable());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:5173")
        );

        configuration.setAllowedMethods(
                List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
        );

        configuration.setAllowedHeaders(
                List.of("Authorization", "Content-Type")
        );

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    private void writeError(HttpServletResponse response,
                            HttpStatus status,
                            String message) throws IOException {

        response.setStatus(status.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");

        response.getWriter().write("""
            {"timestamp":"%s","status":%d,"error":"%s","message":"%s"}
            """.formatted(
                LocalDateTime.now(),
                status.value(),
                status.getReasonPhrase(),
                message));
    }
}