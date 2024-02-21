package com.demo.backendproject.Controller;

import com.demo.backendproject.Dto.LoginDto;
import com.demo.backendproject.Dto.UserDto;
import com.demo.backendproject.Service.UserService;
import com.demo.backendproject.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequestMapping("api/v1/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping(path = "/save")
    public String saveUser(@RequestBody UserDto userDTO)
    {
        String id = userService.addUser(userDTO);
        return id;
    }
    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto){
        LoginResponse loginResponse = userService.loginUser(loginDto);
        return ResponseEntity.ok(loginResponse);
    }

}
