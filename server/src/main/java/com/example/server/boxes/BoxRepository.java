package com.example.server.boxes;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BoxRepository extends JpaRepository<Box, String> {
    List<Box> findByUserId(UUID userId);
    Optional<Box> findById(UUID id);
}
