package com.rescuepaws.authservice.exception;

public class UserNotAuthorizeException extends RuntimeException {
    public UserNotAuthorizeException(String message) {
        super(message);
    }
}
