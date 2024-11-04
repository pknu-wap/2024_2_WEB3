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

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookmarkRepository bookmarkRepository;

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

    public List<PostPreviewDto> getBookmarks(int id) {
        // 사용자 확인
        userRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 북마크 목록 가져오기
        try {
            List<Bookmark> bookmarks = bookmarkRepository.findByUserId(id);

            return bookmarks.stream().map(bookmark -> {
                Post post = bookmark.getPost();
                return new PostPreviewDto(post.getPostId(), post.getPostImage());
            }).collect(Collectors.toList());

        } catch (Exception e) {
            throw new CustomException(ErrorCode.DATABASE_ERROR);
        }
    }
}

