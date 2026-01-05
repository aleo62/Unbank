package com.example.server.transactions;

import com.example.server.transactions.dto.CreateResponseDTO;
import com.example.server.transactions.dto.CreateTransactionDTO;
import com.example.server.transactions.dto.TransactionResponseDTO;
import com.example.server.transactions.exceptions.InvalidTransactionIdException;
import com.example.server.user.User;
import com.example.server.user.UserRepository;
import com.example.server.user.exceptions.CannotAcessAnotherUserInfo;
import com.example.server.user.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
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

        List<TransactionResponseDTO> transactions = this.transactionRepository.findAllByUserId(id);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/{transactionId}")
    public ResponseEntity getTransactionById(@AuthenticationPrincipal User user, @PathVariable String transactionId) {
        UUID id = UUID.fromString(transactionId);

        Transaction transaction = this.transactionRepository.findById(id).orElseThrow(InvalidTransactionIdException::new);;
        if (!user.getId().equals(transaction.getFromUser().getId()) || !user.getId().equals(transaction.getToUser().getId())) {
            throw new CannotAcessAnotherUserInfo();
        }
        return ResponseEntity.ok(transaction);
    }

    @PostMapping
    public ResponseEntity createTransaction(@AuthenticationPrincipal User fromUser, @RequestBody CreateTransactionDTO body) {
        User toUser = body.type() == TransactionType.DEPOSIT || body.type() == TransactionType.WITHDRAW
                ? fromUser : userRepository.findById(UUID.fromString(body.toUserId())).orElseThrow(UserNotFoundException::new);
        TransactionResponseDTO newTransaction = this.transactionService.makeTransaction(fromUser, toUser, body.type(), body.amount(), body.password(), body.boxId());

        return ResponseEntity.ok().body(new CreateResponseDTO("Created!", newTransaction));
    }

}
