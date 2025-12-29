package com.example.server.infra.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public abstract class AppException extends RuntimeException {
    private final HttpStatus status;
    private final String error;
    private final ErrorCodeType errorCode;

    protected AppException(
            HttpStatus status,
            String error,
            ErrorCodeType errorCode
    ) {
        super(error);
        this.status = status;
        this.error = error;
        this.errorCode = errorCode;
    }
}
