package com.demo.backendproject.Service;

import com.demo.backendproject.Dto.LoginDto;
import com.demo.backendproject.Dto.UpdateDto;
import com.demo.backendproject.Dto.UserDto;
import com.demo.backendproject.Entity.UserEntity;
import com.demo.backendproject.response.LoginResponse;

import java.util.List;

public interface UserService {
    String addUser(UserDto userDTO);

    LoginResponse loginUser(LoginDto loginDto);

    List<UserEntity> fetchUserList();

    UserEntity fetchUserById(int userId);

    void deleteUserById(int userId);

    UserEntity updateUser(int userId, UpdateDto updateDto);
}
