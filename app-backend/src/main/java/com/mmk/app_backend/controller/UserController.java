package com.mmk.app_backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.app_backend.dao.UserRepository;
import com.mmk.app_backend.vo.User_InfoVO;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/id")
    public Optional<User_InfoVO> getUserTempById() {
        System.out.println(userRepository.findById("jh_ID"));
        return userRepository.findById("jh_ID");
    }

    @PostMapping("/update")
    public void postMethodName(@RequestBody User_InfoVO uv) {
        userRepository.save(uv);
    }
    
}