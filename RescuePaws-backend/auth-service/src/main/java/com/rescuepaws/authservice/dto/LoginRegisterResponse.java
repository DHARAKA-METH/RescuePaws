package com.rescuepaws.authservice.dto;

import com.rescuepaws.authservice.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginRegisterResponse {
    private User user;
    private String jwtToken;
}
