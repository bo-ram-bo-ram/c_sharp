package com.jootalkpia.auth_server.client.kakao.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record KakaoAccount(
        String email,
        KakaoUserProfile profile
) {
}
