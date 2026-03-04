package com.rescuepaws.authservice.service;

import com.rescuepaws.authservice.exception.EmailAlreadyExistsException;
import com.rescuepaws.authservice.exception.IncorrectPasswordException;
import com.rescuepaws.authservice.exception.UserNotFoundException;
import com.rescuepaws.authservice.model.User;
import com.rescuepaws.authservice.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private  final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;

    }

    @Override
    public User register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
           throw new EmailAlreadyExistsException("Email address already exists");
        }
        //  Encrypt password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User login(String email, String password, String role) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));


        //Compare raw password with encrypted password
        if (!passwordEncoder.matches(password,user.getPassword())) {
            throw new IncorrectPasswordException("Incorrect password");
        }
        if (!Objects.equals(role, user.getRole())) {
            throw new IncorrectPasswordException("You are not allowed to login");
        }
        return user;
    }




}
