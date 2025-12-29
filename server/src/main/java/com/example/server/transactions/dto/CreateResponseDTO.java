package com.example.server.transactions.dto;

import com.example.server.transactions.Transaction;

public record CreateResponseDTO(String message, Transaction transaction) {
}
