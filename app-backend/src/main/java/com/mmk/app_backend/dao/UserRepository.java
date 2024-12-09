package com.mmk.app_backend.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.app_backend.vo.UserVO;

public interface UserRepository extends JpaRepository<UserVO, Integer> {
    public List<UserVO> findUserVOById(String id);
}
