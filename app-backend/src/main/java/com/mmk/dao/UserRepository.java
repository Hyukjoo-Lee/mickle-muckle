package com.mmk.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    UserEntity findByUserId(String userId);

    UserEntity findByEmail(String email);

    boolean existsByUserId(String userId);

    boolean existsByEmail(String email);
}
