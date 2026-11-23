package com.superteam.intranet.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Clock;
import java.time.ZoneId;

@Configuration
public class TimeConfig {

    public static final ZoneId STOCKHOLM = ZoneId.of("Europe/Stockholm");

    @Bean
    public Clock clock() {
        return Clock.system(STOCKHOLM);
    }
}