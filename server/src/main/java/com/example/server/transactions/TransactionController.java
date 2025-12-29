package com.example.server.transactions;

import com.example.server.transactions.dto.CreateResponseDTO;
import com.example.server.transactions.dto.CreateTransactionDTO;
import com.example.server.user.User;
import com.example.server.user.UserRepository;
import com.example.server.user.exceptions.CannotAcessAnotherUserInfo;
import com.example.server.user.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionRepository transactionRepository;
    private final TransactionService transactionService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity getAllTransactions(@AuthenticationPrincipal User user, String userId) {
        UUID id = UUID.fromString(userId);

        if (!user.getId().equals(id)) {
            throw new CannotAcessAnotherUserInfo();
        }

        List<Transaction> transactions = this.transactionRepository.findByFromUser_IdOrToUser_Id(id, id);
        return ResponseEntity.ok(transactions);
    }

    @PostMapping
    public ResponseEntity createTransaction(@AuthenticationPrincipal User fromUser, @RequestBody CreateTransactionDTO body) {
        User toUser = userRepository.findById(UUID.fromString(body.toUserId())).orElseThrow(UserNotFoundException::new);
        Transaction newTransaction = this.transactionService.makeTransaction(toUser, fromUser, body.type(), body.amount());

        return ResponseEntity.ok().body(new CreateResponseDTO("Created!", newTransaction));
    }

}
