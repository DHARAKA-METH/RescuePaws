package com.rescuepaws.authservice.service;

import com.rescuepaws.authservice.dto.LoginRegisterResponse;
import com.rescuepaws.authservice.exception.EmailAlreadyExistsException;
import com.rescuepaws.authservice.exception.IncorrectPasswordException;
import com.rescuepaws.authservice.exception.UserNotFoundException;
import com.rescuepaws.authservice.model.User;
import com.rescuepaws.authservice.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.rescuepaws.authservice.util.JwtUtil;

import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;


    }

    @Override
    public LoginRegisterResponse register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyExistsException("Email address already exists");
        }
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new EmailAlreadyExistsException("Username already exists Try Different Username");
        }
        //  Encrypt password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User newUser = userRepository.save(user);
        String jwtToken = jwtUtil.generateToken(newUser.getEmail(),newUser.getRole());
        return new LoginRegisterResponse(newUser, jwtToken);
    }

    @Override
    public LoginRegisterResponse login(String email, String password, String role) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));


        //Compare raw password with encrypted password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IncorrectPasswordException("Incorrect password");
        }
        if (!Objects.equals(role, user.getRole())) {
            throw new IncorrectPasswordException("You are not allowed to login");
        }

        // generate jwt token
        String jwtToken = jwtUtil.generateToken(user.getEmail(),user.getRole());


        return new LoginRegisterResponse(user, jwtToken);


    }

}
