package com.example.server.boxes;

import com.example.server.boxes.dto.CreateBoxDTO;
import com.example.server.boxes.dto.CreateResponseDTO;
import com.example.server.transactions.Transaction;
import com.example.server.user.User;
import com.example.server.user.exceptions.CannotAcessAnotherUserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/boxes")
@RequiredArgsConstructor
public class BoxController {
    private final BoxService boxService;
    private final BoxRepository boxRepository;

    @GetMapping
    public ResponseEntity getAllBoxes(@AuthenticationPrincipal User user, String userId) {
        UUID id = UUID.fromString(userId);

        if (!user.getId().equals(id)) {
            throw new CannotAcessAnotherUserInfo();
        }

        List<Box> boxes = this.boxRepository.findByUserId(id);
        return ResponseEntity.ok(boxes);
    }

    @PostMapping
    public ResponseEntity createBox(@AuthenticationPrincipal User user, @RequestBody CreateBoxDTO body) {
        Box newBox = this.boxService.makeBox(user, body.name(), body.description());
        return ResponseEntity.ok().body(new CreateResponseDTO("Created!", newBox));
    }
}
