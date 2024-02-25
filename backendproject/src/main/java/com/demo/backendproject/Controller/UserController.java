package com.demo.backendproject.Controller;

import com.demo.backendproject.Dto.UpdateDto;
import com.demo.backendproject.Dto.UserDto;
import com.demo.backendproject.Entity.UserEntity;
import com.demo.backendproject.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("api/v1")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/users")
    public List<UserEntity> fetchUserList(){
        return userService.fetchUserList();
    }

    @PostMapping("/user/add")
    public  String addUser(@RequestBody UserDto userDTO){
        String user_id = userService.addUser(userDTO);
        return user_id;
    };

    @GetMapping("/user/{user_id}")
    public UserEntity fetchUserById(@PathVariable("user_id") int user_id){
        return userService.fetchUserById(user_id);
    }
    @PutMapping("/user/{user_id}")
    public UserEntity updateUser(@PathVariable("user_id") int user_id,@RequestBody UpdateDto updateDto){
        return  userService.updateUser(user_id,updateDto);
    }
    @DeleteMapping("/user/{user_id}")
    public String deleteUserById(@PathVariable("user_id") int user_id){
        userService.deleteUserById(user_id);
        return "User Has Been Delete";
    };
}
