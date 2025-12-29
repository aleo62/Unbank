package com.example.server.boxes;

import com.example.server.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoxService {
    private final BoxRepository boxRepository;

    public Box makeBox(User user, String name, String description) {
        Box newBox = new Box();
        newBox.setUser(user);
        newBox.setName(name);
        newBox.setDescription(description);

        boxRepository.save(newBox);
        return newBox;
    }
}
