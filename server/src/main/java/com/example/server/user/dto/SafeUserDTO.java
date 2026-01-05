package com.example.server.user.dto;

import java.util.UUID;

public record SafeUserDTO(UUID id, String name, String email) {}
