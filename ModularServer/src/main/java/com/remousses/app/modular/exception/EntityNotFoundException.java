package com.remousses.app.modular.exception;

import lombok.Getter;

/**
 * Exception thrown when a requested entity is not found
 */
@Getter
public class EntityNotFoundException extends RuntimeException {
    
    private final String entityName;
    private final String fieldName;
    private final Object fieldValue;

    public EntityNotFoundException(String entityName, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s: '%s'", entityName, fieldName, fieldValue));
        this.entityName = entityName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

    public EntityNotFoundException(String message) {
        super(message);
        this.entityName = null;
        this.fieldName = null;
        this.fieldValue = null;
    }

}
