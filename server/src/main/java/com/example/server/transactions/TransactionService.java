package com.example.server.transactions;

import com.example.server.transactions.exceptions.InsufficientBalanceException;
import com.example.server.transactions.exceptions.InvalidPassword;
import com.example.server.user.User;
import com.example.server.boxes.Box;
import com.example.server.boxes.BoxRepository;
import com.example.server.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final BoxRepository boxRepository;

    public Transaction makeTransaction(User fromUser, User toUser, TransactionType type, BigDecimal amount, String password, String boxId) {
        if (!passwordEncoder.matches(password, fromUser.getPasswordHash())) {
            throw new InvalidPassword();
        }

        Transaction newTransaction = new Transaction();
        newTransaction.setFromUser(fromUser);
        newTransaction.setToUser(toUser);
        newTransaction.setType(type);
        newTransaction.setAmount(amount);

        if (boxId != null) {
            Box box = boxRepository.findById(UUID.fromString(boxId)).orElseThrow(() -> new RuntimeException("Box not found"));
            newTransaction.setBox(box);

            if (type == TransactionType.DEPOSIT) {
                this.validateBalance(fromUser.getBalance(), amount);

                fromUser.setBalance(fromUser.getBalance().subtract(amount));
                box.setBalance(box.getBalance().add(amount));
            } else if (type == TransactionType.WITHDRAW) {
                this.validateBalance(box.getBalance(), amount);

                box.setBalance(box.getBalance().subtract(amount));
                fromUser.setBalance(fromUser.getBalance().add(amount));
            }

            this.boxRepository.save(box);
            this.userRepository.save(fromUser);
        } else {
            if(type != TransactionType.DEPOSIT) this.validateBalance(fromUser.getBalance(), amount);

            toUser.setBalance(toUser.getBalance().add(amount));

            if(type != TransactionType.DEPOSIT) {
                fromUser.setBalance(fromUser.getBalance().subtract(amount));
                this.userRepository.save(fromUser);
            }

            this.userRepository.save(toUser);
        }
        
        this.transactionRepository.save(newTransaction);
        return newTransaction;
    }

    private void validateBalance(BigDecimal balance, BigDecimal amount) {
        if (balance.compareTo(amount) < 0) {
            throw new InsufficientBalanceException();
        }
    }

}
