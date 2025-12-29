package com.example.server.user.exceptions;

import com.example.server.infra.exception.AppException;
import com.example.server.infra.exception.ErrorCodeType;
import org.springframework.http.HttpStatus;

public class CannotAcessAnotherUserInfo extends AppException {
    public CannotAcessAnotherUserInfo() {
        super(HttpStatus.FORBIDDEN, "Can not access another User info", ErrorCodeType.CANNOT_ACCESS_ANOTHER_USER_INFO);
    }
}