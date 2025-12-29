package com.example.server.infra.exception;

import com.example.server.transactions.exceptions.InsufficientBalanceException;
import com.example.server.user.exceptions.UserNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.Optional;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(AppException.class)
    public ResponseEntity handleAppException(
            AppException ex,
            HttpServletRequest request
    ) {
        ErrorResponse response = new ErrorResponse(ex.getError(), ex.getErrorCode(), null, request.getRequestURI(), Instant.now());

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }

    @ExceptionHandler({IllegalArgumentException.class, NullPointerException.class})
    public ResponseEntity handleGenericException(
            RuntimeException ex,
            HttpServletRequest request
    ) {
        ErrorResponse response = new ErrorResponse(ex.getMessage(), ErrorCodeType.INTERNAL_SERVER_ERROR, ex.getLocalizedMessage(), request.getRequestURI(), Instant.now());

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }


}
