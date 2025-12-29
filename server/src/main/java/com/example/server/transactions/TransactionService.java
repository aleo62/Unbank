package com.example.server.transactions;

import com.example.server.transactions.exceptions.InsufficientBalanceException;
import com.example.server.user.User;
import com.example.server.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public Transaction makeTransaction(User fromUser, User toUser, TransactionType type, BigDecimal amount) {
        if(amount.compareTo(fromUser.getBalance()) < 0  && type != TransactionType.DEPOSIT) {
            throw new InsufficientBalanceException();
        }

        Transaction newTransaction = new Transaction();
        newTransaction.setFromUser(fromUser);
        newTransaction.setToUser(toUser);
        newTransaction.setType(type);
        newTransaction.setAmount(amount);
        this.transactionRepository.save(newTransaction);

        toUser.setBalance(toUser.getBalance().add(amount));
        this.userRepository.save(toUser);

        return newTransaction;
    }

}
