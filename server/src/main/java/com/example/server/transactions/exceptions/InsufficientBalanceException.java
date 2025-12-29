package com.example.server.transactions.exceptions;

import com.example.server.infra.exception.AppException;
import com.example.server.infra.exception.ErrorCodeType;
import org.springframework.http.HttpStatus;

public class InsufficientBalanceException extends AppException {
    public InsufficientBalanceException() {
        super(HttpStatus.BAD_REQUEST, "Insufficient Balance", ErrorCodeType.INSUFFICIENT_BALANCE);
    }
}
