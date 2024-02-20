package com.demo.backendproject.Controller;

import com.demo.backendproject.Dto.UserDto;
import com.demo.backendproject.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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


}
