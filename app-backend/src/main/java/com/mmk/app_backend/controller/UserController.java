package com.mmk.app_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.app_backend.dao.UserRepository;
import com.mmk.app_backend.vo.UserVO;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/id")
    public List<UserVO> getUserTempById() {
        System.out.println(userRepository.findUserVOById("jh_ID"));
        return userRepository.findUserVOById("jh_ID");
    }

    @PostMapping("/update")
    public void postMethodName(@RequestBody UserVO uv) {
        userRepository.save(uv);
    }
    
}