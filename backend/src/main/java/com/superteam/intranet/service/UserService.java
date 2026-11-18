
package com.superteam.intranet.service;

import com.superteam.intranet.model.Program;
import com.superteam.intranet.model.SchoolClass;
import com.superteam.intranet.dto.*;
import com.superteam.intranet.mapper.UserMapper;
import com.superteam.intranet.model.AccessRole;
import com.superteam.intranet.model.User;
import com.superteam.intranet.model.UserStatus;
import com.superteam.intranet.model.UserType;
import com.superteam.intranet.repository.ProgramRepository;
import com.superteam.intranet.repository.SchoolClassRepository;
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
    private final ProgramRepository programRepository;
    private final SchoolClassRepository schoolClassRepository;

    public UserService(UserRepository userRepository,
                       UserMapper userMapper,
                       PasswordEncoder passwordEncoder,
                       ProgramRepository programRepository,
                       SchoolClassRepository schoolClassRepository) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.programRepository = programRepository;
        this.schoolClassRepository = schoolClassRepository;

    }

    @Transactional
    public UserResponse createUser(CreateUserRequest request) {

        String email = request.email().trim().toLowerCase();

        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new DuplicateEmailException("Email already exists");
        }

        validateAccessRole(request.userType(), request.accessRole());

        Program program = programRepository.findById(request.programId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Programmet kunde inte hittas."
                ));
        SchoolClass schoolClass = null;

        if (request.userType() == UserType.STUDENT) {

            if (request.classId() == null) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Studenter måste tilldelas en klass."
                );
            }

            schoolClass = schoolClassRepository.findById(request.classId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Klassen kunde inte hittas."
                    ));

            if (!schoolClass.getProgram().getId().equals(program.getId())) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Klassen tillhör inte det valda programmet."
                );
            }
        }

        User user = new User();

        user.setFirstName(request.firstName().trim());
        user.setLastName(request.lastName().trim());
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setUserType(request.userType());
        user.setAccessRole(request.accessRole());
        user.setStatus(UserStatus.ACTIVE);
        user.setProgram(program);
        user.setSchoolClass(schoolClass);

        User savedUser = userRepository.save(user);

        return userMapper.toResponse(savedUser);
    }

    @Transactional(readOnly = true)
    public UserResponse getUserById(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        return userMapper.toResponse(user);
    }

    // Get current user's own profile
    @Transactional(readOnly = true)
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

    @Transactional
    public UserResponse updateUserByAdmin(
            Long userId,
            AdminUpdateUserRequest request,
            Long currentUserId) {

        // Kontrollera att admin inte redigerar sig själv
        if (userId.equals(currentUserId)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Du kan inte redigera ditt eget konto här."
            );
        }

        // Hämta användaren som ska redigeras
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Användaren kunde inte hittas."
                ));

        // Kontrollera att e-postadressen är ledig
        String email = request.email().trim().toLowerCase();

        if (userRepository.existsByEmailIgnoreCaseAndIdNot(email, userId)) {
            throw new DuplicateEmailException("E-postadressen används redan.");
        }

        // Uppdatera personuppgifter
        user.setFirstName(request.firstName().trim());
        user.setLastName(request.lastName().trim());
        user.setEmail(email);

        // Uppdatera lösenord endast om ett nytt har angetts
        if (request.password() != null && !request.password().isBlank()) {

            if (request.password().length() < 12) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Lösenordet måste innehålla minst 12 tecken."
                );
            }

            user.setPasswordHash(passwordEncoder.encode(request.password()));
        }

        // Hämta valt program
        Program program = programRepository.findById(request.programId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Programmet kunde inte hittas."
                ));

        SchoolClass schoolClass = null;

        // Studenter måste ha en klass som tillhör programmet
        if (user.getUserType() == UserType.STUDENT) {

            if (request.classId() == null) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Studenter måste tilldelas en klass."
                );
            }

            schoolClass = schoolClassRepository.findById(request.classId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Klassen kunde inte hittas."
                    ));

            if (!schoolClass.getProgram().getId().equals(program.getId())) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Klassen tillhör inte det valda programmet."
                );
            }

        } else if (request.classId() != null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Lärare kan inte tilldelas en klass."
            );
        }

        // Uppdatera utbildningstillhörighet
        user.setProgram(program);
        user.setSchoolClass(schoolClass);

        User updatedUser = userRepository.save(user);

        return userMapper.toResponse(updatedUser);
    }

    @Transactional
    public void changePassword(Long userId, ChangePasswordRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Användaren kunde inte hittas."
                ));

        // Kontrollerar att nuvarande lösenord är korrekt.
        if (!passwordEncoder.matches(
                request.currentPassword(),
                user.getPasswordHash())) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Nuvarande lösenord är felaktigt."
            );
        }

        // Kontrollerar att det nya lösenordet skiljer sig från det gamla.
        if (passwordEncoder.matches(
                request.newPassword(),
                user.getPasswordHash())) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Det nya lösenordet måste skilja sig från det nuvarande."
            );
        }

        // Hashar och sparar det nya lösenordet.
        user.setPasswordHash(passwordEncoder.encode(request.newPassword()));

        userRepository.save(user);
    }



    // Get another user's profile
    @Transactional(readOnly = true)
    public UserProfileResponse getUserProfileById(
            Long userId,
            Long currentUserId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        User currentUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Current user not found"
                ));

        boolean isAdmin = currentUser.getAccessRole() == AccessRole.ADMIN;

        return userMapper.toProfileResponse(user, isAdmin);
    }

   @Transactional
    public UserResponse updateUserStatus(
        Long userId,
        UpdateUserStatusRequest request,
        Long currentUserId) {

    User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "User not found"
            ));

    if (userId.equals(currentUserId)
            && user.getAccessRole() == AccessRole.ADMIN
            && user.getStatus() == UserStatus.ACTIVE
            && request.status() != UserStatus.ACTIVE) {

        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Du kan inte inaktivera ditt eget administratörskonto."
        );
    }

    user.setStatus(request.status());

    User updatedUser = userRepository.save(user);

    return userMapper.toResponse(updatedUser);
    }

    @Transactional
    public UserResponse updateUserRole(
        Long userId,
        UpdateUserRoleRequest request,
        Long currentUserId) {

    User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "User not found"
            ));

    // En administratör får inte ta bort sin egen ADMIN-behörighet
    if (userId.equals(currentUserId)
            && user.getAccessRole() == AccessRole.ADMIN
            && request.accessRole() != AccessRole.ADMIN) {

        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Du kan inte ta bort din egen administratörsbehörighet."
        );
    }

    // Studenter får inte ha ADMIN-behörighet
    validateAccessRole(user.getUserType(), request.accessRole());

    user.setAccessRole(request.accessRole());

    User updatedUser = userRepository.save(user);

    return userMapper.toResponse(updatedUser);
 }

    @Transactional(readOnly = true)
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

    private void validateAccessRole(UserType userType, AccessRole accessRole) {
    if (userType == UserType.STUDENT
            && accessRole == AccessRole.ADMIN) {

        throw new IllegalArgumentException(
                "A student cannot have admin access"
        );
    }
}
}
