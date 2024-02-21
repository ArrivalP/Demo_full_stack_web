package com.demo.backendproject.Repo;

import com.demo.backendproject.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface UserRepo extends JpaRepository<UserEntity,Integer> {
    Optional<UserEntity> findOneByEmailAndPassword(String email, String password);

    UserEntity findByEmail(String email);
}
