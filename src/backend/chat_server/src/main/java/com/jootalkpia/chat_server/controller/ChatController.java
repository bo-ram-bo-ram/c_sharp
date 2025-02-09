package com.jootalkpia.chat_server.controller;

import com.jootalkpia.chat_server.dto.messgaeDto.ChatMessageRequest;
import com.jootalkpia.chat_server.dto.ChatMessageToKafka;
import com.jootalkpia.chat_server.service.ChatService;
import com.jootalkpia.chat_server.service.KafkaProducer;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final KafkaProducer kafkaProducer;
    private final ChatService chatService;

    @MessageMapping("/chat.{channelId}")
    public void sendMessage(ChatMessageRequest request, @DestinationVariable Long channelId) {
        List chatMessage = chatService.createMessage(request);  //Type 건들지말것
        ChatMessageToKafka chatMessageToKafka = new ChatMessageToKafka(channelId, chatMessage);
        kafkaProducer.sendChatMessage(chatMessageToKafka, channelId);
    }
}
