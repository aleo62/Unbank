package com.example.server.transactions.exceptions;

import com.example.server.infra.exception.AppException;
import com.example.server.infra.exception.ErrorCodeType;
import org.springframework.http.HttpStatus;

public class InvalidPasswordException extends AppException {
    public InvalidPasswordException() {
        super(HttpStatus.FORBIDDEN, "Invalid Password", ErrorCodeType.INVALID_PASSOWRD);
    }
}
