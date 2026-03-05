package com.rescuepaws.authservice.service;

import com.rescuepaws.authservice.dto.LoginRegisterResponse;
import com.rescuepaws.authservice.model.User;

public interface UserService {
    LoginRegisterResponse register(User user);

    LoginRegisterResponse login(String email, String password, String role);
}