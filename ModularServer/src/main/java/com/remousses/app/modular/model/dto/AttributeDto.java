package com.remousses.app.modular.model.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttributeDto {
	private Integer id;
	
	@NotBlank(message = "Attribute name is required")
	@Size(min = 1, max = 255, message = "Attribute name must be between 1 and 255 characters")
	private String name;
	
	@NotBlank(message = "Attribute type is required")
	@Size(min = 1, max = 100, message = "Attribute type must be between 1 and 100 characters")
	private String type;
	
	@Size(max = 1000, message = "Attribute value must not exceed 1000 characters")
	private String value;
	
	@JsonBackReference
	private CustomComponentDto customComponent;
}
