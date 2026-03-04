package com.rescuepaws.authservice.exception;

import com.rescuepaws.authservice.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ApiResponse<Void>> handleEmailExists(EmailAlreadyExistsException ex) {
        ApiResponse<Void> response = new ApiResponse<>(false, ex.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.CONFLICT); // 409
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleUserNotFound(UserNotFoundException ex) {
        ApiResponse<Void> response = new ApiResponse<>(false, ex.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND); // 404
    }

    @ExceptionHandler(IncorrectPasswordException.class)
    public ResponseEntity<ApiResponse<Void>> handleIncorrectPassword(IncorrectPasswordException ex) {
        ApiResponse<Void> response = new ApiResponse<>(false, ex.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED); // 401
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGeneralException(Exception ex) {
        ApiResponse<Void> response = new ApiResponse<>(false, "Something went wrong", null);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR); // 500
    }

}
