package com.example.server.transactions;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    List<Transaction> findByFromUser_IdOrToUser_Id(UUID fromId, UUID toId);
}
