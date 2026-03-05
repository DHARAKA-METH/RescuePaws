package com.rescuepaws.authservice.controller;

import com.rescuepaws.authservice.dto.ApiResponse;
import com.rescuepaws.authservice.dto.LoginRegisterResponse;
import com.rescuepaws.authservice.model.User;
import com.rescuepaws.authservice.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> register(@RequestBody User user) {

        LoginRegisterResponse newUser = userService.register(user);
        return ResponseEntity.ok(new ApiResponse<>(true, "Register successful", newUser.getUser(), newUser.getJwtToken()));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<User>> login(@RequestBody User loginRequest) {

        LoginRegisterResponse user = userService.login(
                loginRequest.getEmail(),
                loginRequest.getPassword(),
                loginRequest.getRole()

        );
        return ResponseEntity.ok(
                new ApiResponse<User>(true, "Login successful!", user.getUser(), user.getJwtToken())
        );

    }
}
