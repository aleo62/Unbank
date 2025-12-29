package com.example.server.user.exceptions;

import com.example.server.infra.exception.AppException;
import com.example.server.infra.exception.ErrorCodeType;
import org.springframework.http.HttpStatus;

public class UserNotFoundException extends AppException {
    public UserNotFoundException() {
        super(HttpStatus.NOT_FOUND, "User not found", ErrorCodeType.USER_NOT_FOUND);
    }
}

