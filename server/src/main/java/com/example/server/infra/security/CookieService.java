package com.example.server.infra.security;

import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class CookieService {
    private static final String AUTH_COOKIE_NAME = "auth_token";
    private static final int TOKEN_EXPIRATION_TIME = 7200;

    @Value("${app.cookie.secure:false}")
    private boolean cookieSecure;

    public Cookie createAuthCookie(String token) {
        Cookie cookie = new Cookie(AUTH_COOKIE_NAME, token);
        cookie.setHttpOnly(true);
        cookie.setSecure(cookieSecure);
        cookie.setMaxAge(TOKEN_EXPIRATION_TIME);
        cookie.setPath("/");

        return cookie;
    }

    public Cookie createLogoutAuthCookie() {
        Cookie cookie = new Cookie(AUTH_COOKIE_NAME, null);
        cookie.setHttpOnly(true);
        cookie.setSecure(cookieSecure);
        cookie.setPath("/");
        cookie.setMaxAge(0);

        return cookie;
    }
}
