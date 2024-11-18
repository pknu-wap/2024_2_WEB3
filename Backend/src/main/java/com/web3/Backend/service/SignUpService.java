package com.web3.Backend.service;

import com.web3.Backend.domain.User;
import com.web3.Backend.dto.UserDto;
import com.web3.Backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class SignUpService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public SignUpService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public void SignUpProcess(UserDto userDto) {
        String username = userDto.getUserName();
        String password = userDto.getPassword();
        String userId = userDto.getUserId();

        // 사용자명 정규식 검사 (UserDto에서 이미 처리됨)
        if (!username.matches("^[a-zA-Z0-9]{2,10}@[a-zA-Z0-9]{2,20}$")) {
            throw new IllegalArgumentException("userName must contain 2 to 10 alphanumeric characters followed by an '@' symbol, and the domain must contain 2 to 20 alphanumeric characters.");
        }

        // 사용자 아이디 정규식 검사 (UserDto에서 이미 처리됨)
        if (!userId.matches("^[a-zA-zㄱ-ㅎ가-힣]{2,10}$")) {
            throw new IllegalArgumentException("userId must be between 2 and 10 characters, consisting of letters or Korean characters.");
        }

        // 패스워드 정규식 검사
        String passwordPattern = "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&].{8,16}$";
        Pattern pattern = Pattern.compile(passwordPattern);
        if(!pattern.matcher(password).matches()){
            throw new IllegalArgumentException("password must be 8-16 characters, including at least one number, one letter, and one special character.");
        }
        if (userRepository.existsByUserName(username)) {
            throw new IllegalArgumentException("User Name already exists");
        }

        //DB에 저장하기 위해 User 엔티티(domain) 로 변환
        User user = User.builder()
                .userName(userDto.getUserName())
                .userId(userDto.getUserId())
                .password(bCryptPasswordEncoder.encode(userDto.getPassword()))
                .preferenceLevel(null)
                .profileImageUrl(null)
                .role(null)
                .build();
        // DB 에 저장
        userRepository.save(user);
    }
}