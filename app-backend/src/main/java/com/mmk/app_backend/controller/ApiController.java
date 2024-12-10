package com.mmk.app_backend.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.app_backend.dao.UserRepository;
import com.mmk.app_backend.service.UserService;
import com.mmk.app_backend.vo.UserVO;

@RestController
public class ApiController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping("/api/time")
    public ResponseEntity<String> getTime() {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return ResponseEntity.ok().body(LocalDateTime.now().format(dtf));
    }

    @PostMapping("/users")
    public UserVO addUser(@RequestBody UserVO userVO) {
        return userService.createUser(userVO.getId(), userVO.getPassword());
    }

    @GetMapping("/api/users")
    public ResponseEntity<List<UserVO>> getAllUsers() {
        List<UserVO> list = userRepository.findAll();
        return ResponseEntity.ok().body(list);
    }

}
