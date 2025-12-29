package com.example.server.transactions.dto;

import com.example.server.transactions.TransactionType;

import java.math.BigDecimal;

public record CreateTransactionDTO(String toUserId, BigDecimal amount, TransactionType type) {}
