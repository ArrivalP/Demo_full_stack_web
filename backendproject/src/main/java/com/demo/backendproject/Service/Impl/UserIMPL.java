package com.demo.backendproject.Service.Impl;

import com.demo.backendproject.Dto.LoginDto;
import com.demo.backendproject.Dto.UpdateDto;
import com.demo.backendproject.Dto.UserDto;
import com.demo.backendproject.Entity.UserEntity;
import com.demo.backendproject.Repo.UserRepo;
import com.demo.backendproject.Service.UserService;
import com.demo.backendproject.response.InvalidPasswordException;
import com.demo.backendproject.response.LoginResponse;
import com.demo.backendproject.response.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
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
                    Integer user_id = user1.getUser_id();
                    String  name    = user1.getName();
                    return new LoginResponse("Login Success", true,user_id,name);
                } else {
                    return new LoginResponse("Login Failed", false,0,"");
                }
            } else {
                return new LoginResponse("Password not Match", false,0,"");
            }
        } else {
            return new LoginResponse("Email Not Exists", false,0,"");
        }
    }

    public List<UserEntity> fetchUserList() {
        return userRepo.findAll();
    }

    public UserEntity fetchUserById(int userId) {
        Optional<UserEntity> user =userRepo.findById(userId);
        if(user.isPresent()) {
            return user.get();
        }else{
            throw new UserNotFoundException("User with ID " + userId + " not found");
        }
    }
    public void deleteUserById(int userId) {
        userRepo.deleteById(userId);
    }

    public UserEntity updateUser(int userId, UpdateDto updateDto) {
        Optional<UserEntity> optionalUser = userRepo.findById(userId);
        if(optionalUser.isPresent()){
            UserEntity existingUser = optionalUser.get();
            String oldPassword = updateDto.getOldPassword();
            String newPassword = updateDto.getNewPassword();

            if (!passwordEncoder.matches(oldPassword, existingUser.getPassword())) {
                throw new InvalidPasswordException("Old password is incorrect");
            }
            if (oldPassword.equals(newPassword)) {
                throw new IllegalArgumentException("New password must be different from the old password");
            }

            existingUser.setPassword(passwordEncoder.encode(newPassword));
            existingUser.setName(updateDto.getName());
            userRepo.save(existingUser);

            return existingUser;
        }else{
            throw new UserNotFoundException("User with ID " + userId + " not found");
        }
    }
}
