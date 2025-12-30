package com.example.server.auth;

import com.example.server.auth.dto.LoginRequestDTO;
import com.example.server.auth.dto.RegisterRequestDTO;
import com.example.server.auth.dto.ResponseDTO;
import com.example.server.infra.security.CookieService;
import com.example.server.infra.security.TokenService;
import com.example.server.user.User;
import com.example.server.user.UserRepository;
import com.example.server.user.exceptions.UserNotFoundException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final CookieService cookieService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body, HttpServletResponse response) {
        User user = this.userRepository.findByEmail(body.email()).orElseThrow(UserNotFoundException::new);

        if(passwordEncoder.matches(body.password(), user.getPasswordHash())) {
            String token = this.tokenService.generateToken(user);
            Cookie cookie = cookieService.createAuthCookie(token);
            response.addCookie(cookie);

            return ResponseEntity.ok(new ResponseDTO(user.getName(), token));
        }

        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body, HttpServletResponse response) {
        Optional<User> user = this.userRepository.findByEmail(body.email());

        if(user.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        User newUser = new User();
        newUser.setEmail(body.email());
        newUser.setPasswordHash(this.passwordEncoder.encode(body.password()));
        newUser.setName(body.name());

        this.userRepository.save(newUser);

        String token = this.tokenService.generateToken(newUser);
        Cookie cookie = cookieService.createAuthCookie(token);
        response.addCookie(cookie);

        return ResponseEntity.ok(new ResponseDTO(newUser.getName(), token));
    }

    @PostMapping("/logout")
    public ResponseEntity logout(@RequestBody HttpServletResponse response) {
        response.addCookie(cookieService.createLogoutAuthCookie());
        return ResponseEntity.ok().build();
    }
}
