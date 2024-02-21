package com.demo.backendproject.Service;

import com.demo.backendproject.Dto.LoginDto;
import com.demo.backendproject.Dto.UserDto;
import com.demo.backendproject.response.LoginResponse;

public interface UserService {
    String addUser(UserDto userDTO);

    LoginResponse loginUser(LoginDto loginDto);
}
