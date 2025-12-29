package com.example.server.user;


import com.example.server.user.exceptions.CannotAcessAnotherUserInfo;
import com.example.server.user.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.security.core.context.SecurityContextHolder;

import java.util.UUID;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<User> getUser(@AuthenticationPrincipal User requestUser, @RequestParam(required = false) String userId) {
        if (userId == null) {
            return ResponseEntity.notFound().build();
        }
        UUID id = UUID.fromString(userId);

        if(!requestUser.getId().equals(id)) {
            throw new CannotAcessAnotherUserInfo();
        }

        User user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/me")
    public ResponseEntity<User> getSelfUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(user);
    }
}
