package com.web3.Backend.service;


import com.web3.Backend.domain.Bookmark;
import com.web3.Backend.domain.Post;
import com.web3.Backend.domain.User;
import com.web3.Backend.dto.PostPreviewDto;
import com.web3.Backend.dto.UserDto;
import com.web3.Backend.exception.CustomException;
import com.web3.Backend.exception.ErrorCode;
import com.web3.Backend.repository.BookmarkRepository;
import com.web3.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookmarkRepository bookmarkRepository;
    @Autowired
    private FileStorageService fileStorageService;

    public UserDto getUserById(int userId) {
        try {
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                return UserDto.builder()
                        .userId(user.getUserId())
                        .userName(user.getUserName())
                        .profileImageUrl(user.getProfileImageUrl())
                        .preferenceLevel(user.getPreferenceLevel())
                        .build();
            } else {
                throw new CustomException(ErrorCode.USER_NOT_FOUND);
            }

        } catch (NumberFormatException e) {
            throw new CustomException(ErrorCode.BAD_REQUEST);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.DATABASE_ERROR);
        }
    }

    public List<PostPreviewDto> getBookmarks(int userId) {
        // 사용자 확인
        userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 북마크 목록 가져오기
        try {
            List<Bookmark> bookmarks = bookmarkRepository.findByUserId(userId);

            return bookmarks.stream().map(bookmark -> {
                Post post = bookmark.getPost();
                return new PostPreviewDto(post.getPostId(), post.getPostImage());
            }).collect(Collectors.toList());

        } catch (Exception e) {
            throw new CustomException(ErrorCode.DATABASE_ERROR);
        }
    }

    public UserDto updateUserId(int userId, String newUserId) {
        // 사용자 확인
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 새로운 userId가 이미 존재하는지 확인
        if (userRepository.existsByUserId(newUserId)) {
            throw new CustomException(ErrorCode.USER_ID_ALREADY_EXISTS);  // 이미 존재하는 userId일 경우 예외 처리
        }

        // 사용자 userId 변경
        user.setUserId(newUserId);
        userRepository.save(user);

        return UserDto.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .profileImageUrl(user.getProfileImageUrl())
                .preferenceLevel(user.getPreferenceLevel())
                .build();
    }

    public void updatePreferenceLevel(int userId, Double preferenceLevel) {
        // 사용자 확인
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 유효한 도수 값인지 검증
        if (preferenceLevel < 0 || preferenceLevel > 100) {
            throw new CustomException(ErrorCode.INVALID_PREFERENCE_LEVEL);
        }

        user.setPreferenceLevel(preferenceLevel);
        userRepository.save(user);
    }

    public String updateProfileImage(int userId, MultipartFile profileImage) {
        // 사용자 확인
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 파일 저장
        String savedImageUrl = fileStorageService.storeFile(profileImage);

        // 사용자 프로필 이미지 URL 업데이트
        user.setProfileImageUrl(savedImageUrl);
        userRepository.save(user);

        return savedImageUrl;
    }
}

