package com.example.server.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.server.infra.security.dto.ValidateTokenDTO;
import com.example.server.user.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Component
public class TokenService {
    @Value("${api.security.token.secret}")
    String secret;

    public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            return JWT.create()
                    .withIssuer("unbank-api")
                    .withSubject(user.getEmail())
                    .withClaim("version", user.getTokenVersion())
                    .withExpiresAt(generateExpirationDate())
                    .sign(algorithm);
        } catch (JWTCreationException e) {
            throw new RuntimeException(e);
        }
    }

    public ValidateTokenDTO validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            var decodedJWT = JWT.require(algorithm)
                    .withIssuer("unbank-api")
                    .build()
                    .verify(token);

            String email = decodedJWT.getSubject();
            Integer version = decodedJWT.getClaim("version").asInt();

            return new ValidateTokenDTO(email, version);
        } catch (JWTVerificationException e) {
            return null;
        }
    }

    private Instant generateExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
