package com.mmk.app_backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.app_backend.vo.User_InfoVO;

public interface UserRepository extends JpaRepository<User_InfoVO, String> {
    
}
