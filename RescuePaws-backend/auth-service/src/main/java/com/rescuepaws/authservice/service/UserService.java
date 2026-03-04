package com.rescuepaws.authservice.service;

import com.rescuepaws.authservice.model.User;

public interface UserService {
    User register(User user);
    User login(String email, String password);
}
