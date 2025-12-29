package com.example.server.infra.exceptions;

import com.example.server.infra.exception.AppException;
import com.example.server.infra.exception.ErrorCodeType;
import org.springframework.http.HttpStatus;

public class InvalidToken extends AppException {
    public InvalidToken() {
        super(HttpStatus.FORBIDDEN, "Invalid Token", ErrorCodeType.INVALID_TOKEN);
    }
}
