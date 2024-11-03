package com.web3.Backend.service;


import com.web3.Backend.domain.User;
import com.web3.Backend.dto.UserDto;
import com.web3.Backend.exception.CustomException;
import com.web3.Backend.exception.ErrorCode;
import com.web3.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserDto getUserById(int userId) {
        try {
            Optional<User> userOptional = userRepository.findById(userId);

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                return new UserDto(user.getId(), user.getUserName(), user.getProfileImageUrl());
            } else {
                throw new CustomException(ErrorCode.USER_NOT_FOUND);
            }

        } catch (NumberFormatException e) {
            throw new CustomException(ErrorCode.BAD_REQUEST);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.DATABASE_ERROR);
        }
    }
}

