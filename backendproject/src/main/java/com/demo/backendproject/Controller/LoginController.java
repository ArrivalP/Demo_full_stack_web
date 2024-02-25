package com.demo.backendproject.Controller;

import com.demo.backendproject.Dto.LoginDto;
import com.demo.backendproject.Dto.UserDto;
import com.demo.backendproject.Service.UserService;
import com.demo.backendproject.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("api/v1")
public class LoginController {
    @Autowired
    UserService userService;

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto){
        LoginResponse loginResponse = userService.loginUser(loginDto);
        return ResponseEntity.ok(loginResponse);
    }
    @PostMapping(path = "/register")
    public String saveUser(@RequestBody UserDto userDTO)
    {
        String user_id = userService.addUser(userDTO);
        return user_id;
    }
}
