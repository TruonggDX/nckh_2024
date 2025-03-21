package com.hunre.it.webstudyonline.controller.api;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/dis")
public class ApiDiscord {
    private final String TOKEN = "MTM1MDg0Nzc3NjA0ODU1MDExMg.Gi8qbD.EJ_N9Mamcg-4N0q18K0Y8OPxh6-vVZwQcRX3as";
    private final String GUILD_ID = "1346742537758441572";
    private final WebClient webClient;

    public ApiDiscord() {
        webClient= WebClient.builder()
                .baseUrl("https://discord.com/api/v10")
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bot " + TOKEN)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }
    @GetMapping
    public Mono<String> createVoiceChannel(@RequestParam String channelName) {
        return webClient.post()
                .uri("/guilds/" + GUILD_ID + "/channels")
                .bodyValue("{\"name\": \"" + channelName + "\", \"type\": 2, \"bitrate\": 64000, \"user_limit\": 10}")
                .retrieve()
                .bodyToMono(String.class);
    }
}
