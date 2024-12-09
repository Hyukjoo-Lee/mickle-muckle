package com.mmk.app_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.app_backend.dao.UserRepository;
import com.mmk.app_backend.vo.UserVO;

@RestController
public class ApiController {

    @Autowired
    private UserRepository userRepository;

    // @GetMapping("/api/user")
    // public List<UserVO> getUserById(@RequestParam String id) {
    // return this.userRepository.findUserVOById(id);
    // }

    @GetMapping("/api/user")
    public String getUserApi() {
        List<UserVO> list = userRepository.findUserVOById("test");
        String result = "";
        for (int i = 0; i < list.size(); i++) {
            result += list.get(i);
        }
        return result;
    }

    // @GetMapping("/api/user")
    // public String getUserApi() {
    // return (String) userRepository.findUserVOById("test");
    // }

}