package com.websocket.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/api/test")
public class TestController {
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @GetMapping("")
    public ResponseEntity<?> showTest(){
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setMessage("Server gui ve du lieu chi do");
        chatMessage.setTimeStamp(new Date());

        messagingTemplate.convertAndSend("/topic/messages", chatMessage);
        return new ResponseEntity<>("AAA", HttpStatus.OK);
    }
}
