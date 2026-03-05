package com.rescuepaws.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class ApiResponse<T> {
    private final boolean success;
    private final String message;
    private final T data;
    private String JwtToken;

    // constructor with jwt token
    public ApiResponse(boolean success, String message, T data, String JwtToken) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.JwtToken = JwtToken;
    }


    //  constructor without jwtToken
    public ApiResponse(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}

