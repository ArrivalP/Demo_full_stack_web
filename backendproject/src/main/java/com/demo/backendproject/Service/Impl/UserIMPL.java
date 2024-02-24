package com.demo.backendproject.Service.Impl;

import com.demo.backendproject.Dto.LoginDto;
import com.demo.backendproject.Dto.UserDto;
import com.demo.backendproject.Entity.UserEntity;
import com.demo.backendproject.Repo.UserRepo;
import com.demo.backendproject.Service.UserService;
import com.demo.backendproject.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
                this.passwordEncoder.encode(userDTO.getPassword()));
        userRepo.save(userEntity);
        return userEntity.getName();
    }

    @Override
    public LoginResponse loginUser(LoginDto loginDto) {
        UserEntity user1 = userRepo.findByEmail(loginDto.getEmail());
        if (user1 != null) {
            String password = loginDto.getPassword();
            String encodedpassword = user1.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedpassword);
            if (isPwdRight) {
                Optional<UserEntity> user = userRepo.findOneByEmailAndPassword(loginDto.getEmail(), encodedpassword);
                if (user.isPresent()) {
                    return new LoginResponse("Login Success", true);
                } else {
                    return new LoginResponse("Login Failed", false);
                }
            } else {
                return new LoginResponse("Password not Match", false);
            }
        } else {
            return new LoginResponse("Email Not Exists", false);
        }
    }

    UserDto userDto;
}
