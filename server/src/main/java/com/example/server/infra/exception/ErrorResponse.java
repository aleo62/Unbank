package com.example.server.infra.exception;

import java.net.URI;
import java.time.Instant;
import java.util.Optional;

public record ErrorResponse(String error, ErrorCodeType errorCode, String message, String path, Instant timestamp) {

}
