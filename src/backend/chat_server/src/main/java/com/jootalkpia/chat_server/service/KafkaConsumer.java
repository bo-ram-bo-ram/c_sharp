package com.jootalkpia.chat_server.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jootalkpia.chat_server.dto.ChatMessageToKafka;
import com.jootalkpia.chat_server.dto.MinutePriceResponse;
import com.jootalkpia.chat_server.dto.PushMessageToKafka;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaConsumer {

    private final ObjectMapper objectMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @KafkaListener(
            topics = "${topic.minute}",
            groupId = "${group.minute}"
    )
    public void processMinutePrice(String kafkaMessage) {
        log.info("Received Kafka minute message ===> {}", kafkaMessage);

        try {
            MinutePriceResponse stockUpdate = objectMapper.readValue(kafkaMessage, MinutePriceResponse.class);
            String stockDataJson = objectMapper.writeValueAsString(stockUpdate);

            messagingTemplate.convertAndSend("/subscribe/stock", stockDataJson);

            log.info("Broadcasted stock data via WebSocket: " + stockDataJson);

        } catch (Exception ex) {
            log.error("Error processing stock message: " + ex.getMessage(), ex);
        }
    }

    @KafkaListener(
            topics = "${topic.chat}",
            groupId = "${group.chat}",
            concurrency = "2"
    )
    public void processChatMessage(@Header(KafkaHeaders.RECEIVED_KEY) String channelId, String kafkaMessage) {
        log.info("Received Kafka message ===> channelId: {}, message: {}", channelId, kafkaMessage);

        try {
            ChatMessageToKafka chatMessage = objectMapper.readValue(kafkaMessage, ChatMessageToKafka.class);
            String chatDataJson = objectMapper.writeValueAsString(chatMessage);

            messagingTemplate.convertAndSend("/subscribe/chat." + channelId, chatDataJson);
            log.info("Broadcasted chat message via WebSocket: {}", chatDataJson);
            log.info("/subscribe/chat." + channelId);

        } catch (Exception ex) {
            log.error("Error processing chat message: {}", ex.getMessage(), ex);
        }
    }

    @KafkaListener(
            topics = "${topic.push}",
            groupId = "${group.push}"
    )
    public void processPushMessage(String kafkaMessage) {
        log.info("message ===> " + kafkaMessage);

        try {
            PushMessageToKafka pushMessageToKafka = objectMapper.readValue(kafkaMessage, PushMessageToKafka.class);
            String cleanSessionId = pushMessageToKafka.sessionId().replace("\"", "");

            messagingTemplate.convertAndSend("/subscribe/notification." + cleanSessionId, pushMessageToKafka);

            log.info("dto ===> " + pushMessageToKafka);
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex); // 추후에 GlobalException 처리
        }
    }
}
