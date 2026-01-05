package com.example.server.transactions.dto;

import com.example.server.boxes.Box;
import com.example.server.transactions.TransactionType;
import com.example.server.user.dto.SafeUserDTO;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record TransactionResponseDTO(UUID id,
                                     SafeUserDTO fromUser,
                                     SafeUserDTO toUser,
                                     BigDecimal amount,
                                     TransactionType type,
                                     Instant createdAt) {}
