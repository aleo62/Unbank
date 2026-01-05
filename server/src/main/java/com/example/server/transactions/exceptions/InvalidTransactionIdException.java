package com.example.server.transactions.exceptions;

import com.example.server.infra.exception.AppException;
import com.example.server.infra.exception.ErrorCodeType;
import org.springframework.http.HttpStatus;

public class InvalidTransactionIdException extends AppException {
    public InvalidTransactionIdException() {
        super(HttpStatus.NOT_FOUND, "Invalid Transaction ID", ErrorCodeType.INVALID_TRANSACTION_ID);
    }
}
