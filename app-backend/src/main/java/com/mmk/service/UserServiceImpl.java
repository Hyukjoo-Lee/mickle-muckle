package com.mmk.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mmk.dao.UserDAO;
import com.mmk.dto.UserDTO;
import com.mmk.entity.UserEntity;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDAO userDAO;

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        if (userDAO.existsByUserId(userDTO.getUserId())) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        UserEntity userEntity = toEntity(userDTO);
        userDAO.createUser(userEntity);
        return toDTO(userEntity);
    }

    @Override
    public UserDTO getUserById(int id) {
        UserEntity userEntity = userDAO.getUserById(id);
        if (userEntity == null) {
            throw new NoSuchElementException("ID " + id + "에 해당하는 사용자가 없습니다.");
        }
        return toDTO(userEntity);
    }

    @Override
    public UserDTO getUserByUserId(String userId) {
        UserEntity userEntity = userDAO.getUserByUserId(userId);
        if (userEntity == null) {
            throw new NoSuchElementException("아이디 " + userId + "에 해당하는 사용자가 없습니다.");
        }
        return toDTO(userEntity);
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        UserEntity userEntity = userDAO.getUserByEmail(email);
        if (userEntity == null) {
            throw new NoSuchElementException("이메일 " + email + "에 해당하는 사용자가 없습니다.");
        }
        return toDTO(userEntity);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<UserEntity> userEntities = userDAO.getAllUsers();
        if (userEntities.isEmpty()) {
            throw new NoSuchElementException("현재 등록된 유저가 없습니다.");
        }
        return userEntities.stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public void deleteUser(int id) {
        UserEntity userEntity = userDAO.getUserById(id);
        if (userEntity == null) {
            throw new NoSuchElementException("ID " + id + "에 해당하는 사용자가 없습니다.");
        }
        userDAO.deleteUser(id);
    }

    @Override
    public boolean existsByUserId(String userId) {
        return userDAO.existsByUserId(userId);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userDAO.existsByEmail(email);
    }

    public boolean validateLogin(String userId, String password) {
        UserEntity userEntity = userDAO.getUserByUserId(userId);

        if (userEntity != null && userEntity.getPassword().equals(password)) {
            return true;
        }

        return false;
    }

    @Override
    public void updateUser(UserDTO userDTO) {
        UserEntity ue = toEntity(userDTO);
        userDAO.updateUser(ue);
    }

    // DTO → Entity 변환
    private UserEntity toEntity(UserDTO dto) {
        UserEntity entity = new UserEntity();
        entity.setUserNum(dto.getUserNum());
        entity.setUserId(dto.getUserId());
        entity.setPassword(dto.getPassword());
        entity.setEmail(dto.getEmail());
        entity.setName(dto.getName());
        entity.setAddress(dto.getAddress());
        entity.setDetailAddress(dto.getDetailAddress());
        entity.setPostcode(dto.getPostcode());
        entity.setSpendingTarget(dto.getSpendingTarget());
        entity.setProfile(dto.getProfile());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        return entity;
    }

    // Entity → DTO 변환
    private UserDTO toDTO(UserEntity entity) {
        UserDTO dto = new UserDTO();
        dto.setUserNum(entity.getUserNum());
        dto.setUserId(entity.getUserId());
        dto.setPassword(entity.getPassword());
        dto.setEmail(entity.getEmail());
        dto.setName(entity.getName());
        dto.setAddress(entity.getAddress());
        dto.setDetailAddress(entity.getDetailAddress());
        dto.setPostcode(entity.getPostcode());
        dto.setSpendingTarget(entity.getSpendingTarget());
        dto.setProfile(entity.getProfile());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }

}
