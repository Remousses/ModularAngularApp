package com.remousses.app.modular.exception;

import lombok.Getter;

/**
 * Exception thrown when input validation fails
 */
@Getter
public class ValidationException extends RuntimeException {

    private final String fieldName;
    private final String constraint;

    public ValidationException(String message) {
        super(message);
        this.fieldName = null;
        this.constraint = null;
    }

    public ValidationException(String fieldName, String constraint, String message) {
        super(message);
        this.fieldName = fieldName;
        this.constraint = constraint;
    }

}
