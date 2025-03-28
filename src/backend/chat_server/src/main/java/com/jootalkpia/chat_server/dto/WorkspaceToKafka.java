package com.jootalkpia.chat_server.dto;

import java.time.LocalDateTime;

public record WorkspaceToKafka(
        Long workspaceId,
        Long createUserId,
        Long channelId,
        String channelName,
        LocalDateTime createdAt
) {
}
