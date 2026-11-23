
package com.superteam.intranet.repository;

import com.superteam.intranet.model.User;
import com.superteam.intranet.model.UserStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.superteam.intranet.model.SchoolName;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCaseAndIdNot(String email, Long id);

    Optional<User> findByEmailIgnoreCase(String email);

    @Query("""
        SELECT u FROM User u
        WHERE (
            LOWER(u.firstName) LIKE LOWER(CONCAT('%', :search, '%'))
            OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :search, '%'))
            OR LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%'))
            OR LOWER(CONCAT(u.firstName, ' ', u.lastName))
                LIKE LOWER(CONCAT('%', :search, '%'))
        )
        AND (:programId IS NULL OR u.program.id = :programId)
        AND (:classId IS NULL OR u.schoolClass.id = :classId)
        AND (:status IS NULL OR u.status = :status)
        ORDER BY
            CASE WHEN u.status = com.superteam.intranet.model.UserStatus.ACTIVE
                THEN 0 ELSE 1 END,
            u.lastName,
            u.firstName,
            u.id
        """)
    Page<User> searchUsers(
            @Param("search") String search,
            @Param("school") SchoolName school,
            @Param("programId") Long programId,
            @Param("classId") Long classId,
            @Param("statusFilter") String statusFilter,
            Pageable pageable
    );

    @Query("""
        SELECT u FROM User u
        WHERE u.status = com.superteam.intranet.model.UserStatus.ACTIVE
        AND (
            LOWER(u.firstName) LIKE LOWER(CONCAT('%', :search, '%'))
            OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :search, '%'))
            OR LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%'))
            OR LOWER(CONCAT(u.firstName, ' ', u.lastName))
                LIKE LOWER(CONCAT('%', :search, '%'))
        )
        AND (:programId IS NULL OR u.program.id = :programId)
        AND (:classId IS NULL OR u.schoolClass.id = :classId)
        AND (:school IS NULL OR u.program.school.name = :school)
        AND (
             :statusFilter = 'ALL'
             OR (:statusFilter = 'ACTIVE'
        AND u.status = com.superteam.intranet.model.UserStatus.ACTIVE)
             OR (:statusFilter = 'INACTIVE'
        AND u.status <> com.superteam.intranet.model.UserStatus.ACTIVE)
                )
        ORDER BY
            u.lastName,
            u.firstName,
            u.id
        """)
    Page<User> searchActiveUsers(
            @Param("search") String search,
            @Param("school") SchoolName school,
            @Param("programId") Long programId,
            @Param("classId") Long classId,
            Pageable pageable
    );
}
