package com.superteam.intranet.dto;

public record LoginResponse(
        String token,
        String tokenType
) {}
