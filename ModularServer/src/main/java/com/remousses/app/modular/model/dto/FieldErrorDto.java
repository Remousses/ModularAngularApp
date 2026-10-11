package com.remousses.app.modular.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Represents a single field validation error
 */
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FieldErrorDto {
    
    private String field;
    private String message;
    private Object rejectedValue;
}
