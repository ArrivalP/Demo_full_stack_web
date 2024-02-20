package com.demo.backendproject.Service.Impl;

import com.demo.backendproject.Dto.UserDto;
import com.demo.backendproject.Entity.UserEntity;
import com.demo.backendproject.Repo.UserRepo;
import com.demo.backendproject.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserIMPL implements UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public String addUser(UserDto userDTO) {
        UserEntity userEntity = new UserEntity(
                userDTO.getUser_id(),
                userDTO.getName(),
                userDTO.getEmail(),
                this.passwordEncoder.encode(userDTO.getPassword())
        );
        userRepo.save(userEntity);
        return userEntity.getName();
    }
    UserDto userDto;
}
