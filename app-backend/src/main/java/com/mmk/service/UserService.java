package com.mmk.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.mmk.dto.UserDTO;
import com.mmk.entity.UserEntity;

public interface UserService {
    UserDTO createUser(UserDTO userDTO);

    UserDTO findByUserNum(int userNum);

    UserEntity findEntityByUserNum(int nuserNum);

    UserDTO getUserByUserId(String userId);

    UserEntity findByUserId(String userId);

    UserDTO getUserByEmail(String email);

    List<UserDTO> getAllUsers();

    void deleteUser(int id);

    boolean existsByUserId(String userId);

    boolean existsByEmail(String email);

    boolean existByName(String name);

    boolean validateLogin(String userId, String password, boolean isSocialLogin);

    void updateUser(UserDTO userDTO);

    UserDTO getFindId(String name, String email);

    UserDTO getFindPwd(String name, String email, String id);

    ArrayList<Integer> findAllUserNum();

    UserDTO update(String userInfoJson, MultipartFile profileImage, String profileText);

    boolean validatePwd(String userId, String password);

    boolean checkUserState(String userId);
}