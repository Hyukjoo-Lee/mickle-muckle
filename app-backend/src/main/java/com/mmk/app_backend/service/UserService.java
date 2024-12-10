package com.mmk.app_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.app_backend.dao.UserRepository;
import com.mmk.app_backend.vo.UserVO;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserVO createUser(String id, String password) {
        UserVO user = new UserVO();
        user.setId(id);
        user.setPassword(password);
        return userRepository.save(user);
    }
}
