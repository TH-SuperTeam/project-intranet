package com.superteam.intranet.repository;

import com.superteam.intranet.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmailIgnoreCase(String email);

    Optional<User> findByEmailIgnoreCase(String email);

    @Query("""
        SELECT u FROM User u
        WHERE LOWER(u.firstName) LIKE LOWER(CONCAT('%', :search, '%'))
           OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :search, '%'))
           OR LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%'))
           OR LOWER(CONCAT(u.firstName, ' ', u.lastName))
                LIKE LOWER(CONCAT('%', :search, '%'))
        ORDER BY CASE WHEN u.status = com.superteam.intranet.model.UserStatus.ACTIVE
                      THEN 0 ELSE 1 END,
                 u.lastName,
                 u.firstName
        """)
    List<User> searchUsers(@Param("search") String search);

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
    ORDER BY u.lastName,
             u.firstName
""")
    List<User> searchActiveUsers(@Param("search") String search);
}
