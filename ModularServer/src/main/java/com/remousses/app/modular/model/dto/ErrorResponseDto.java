package com.remousses.app.modular.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Structured error response following RFC 7807 Problem Details specification
 */
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponseDto {
    
    private int status;
    private String type;
    private String title;
    private String detail;
    private String instance;
    private LocalDateTime timestamp;
    private List<FieldErrorDto> fieldErrors;

    public static ErrorResponseDto of(int status, String title, String detail) {
        return ErrorResponseDto.builder()
                .status(status)
                .type("about:blank")
                .title(title)
                .detail(detail)
                .timestamp(LocalDateTime.now())
                .build();
    }

    public static ErrorResponseDto of(int status, String title, String detail, String instance) {
        return ErrorResponseDto.builder()
                .status(status)
                .type("about:blank")
                .title(title)
                .detail(detail)
                .instance(instance)
                .timestamp(LocalDateTime.now())
                .build();
    }
}
