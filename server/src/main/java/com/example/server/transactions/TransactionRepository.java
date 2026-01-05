package com.example.server.transactions;

import com.example.server.transactions.dto.TransactionResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    @Query(value ="""
                    SELECT new com.example.server.transactions.dto.TransactionResponseDTO(
                        t.id,
                        new com.example.server.user.dto.SafeUserDTO(f.id, f.name, f.email),
                        new com.example.server.user.dto.SafeUserDTO(tu.id, tu.name, tu.email),
                        t.amount,
                        t.type,
                        t.createdAt
                    )
                    FROM Transaction t
                    JOIN t.fromUser f
                    LEFT JOIN t.toUser tu
                    WHERE f.id = :userId OR tu.id = :userId
                    ORDER BY t.createdAt DESC
                """)
    List<TransactionResponseDTO> findAllByUserId(@Param("userId") UUID userId);

    @Query(value = """
                SELECT new com.example.server.transactions.dto.TransactionResponseDTO(
                    t.id,
                    new com.example.server.user.dto.SafeUserDTO(f.id, f.name, f.email),
                    new com.example.server.user.dto.SafeUserDTO(tu.id, tu.name, tu.email),
                    t.amount,
                    t.type,
                    t.createdAt
                )
                FROM Transaction t
                LEFT JOIN t.fromUser f
                LEFT JOIN t.toUser tu
                WHERE t.id = :id
            """)
    Optional<TransactionResponseDTO> findResponseById(@Param("id") UUID id);
}
