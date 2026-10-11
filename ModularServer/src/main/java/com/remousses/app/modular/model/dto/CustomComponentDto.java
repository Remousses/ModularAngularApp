package com.remousses.app.modular.model.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomComponentDto {
	private Integer id;
	
	@NotBlank(message = "Component name is required")
	@Size(min = 1, max = 255, message = "Component name must be between 1 and 255 characters")
	private String name;
	
	private JsonNode dropPoint;

	@Positive(message = "Component width must be positive")
	private Double width;

	@Positive(message = "Component height must be positive")
	private Double height;
	
	@NotBlank(message = "Component type is required")
	@Size(min = 1, max = 100, message = "Component type must be between 1 and 100 characters")
	private String type;
	
	@NotNull(message = "Component must belong to a page")
	@JsonBackReference
	private PageDto page;
	
	@Valid
	@JsonManagedReference
	private List<AttributeDto> attributes = new ArrayList<>();

	@SuppressWarnings("unused")
	public void addAttribute(AttributeDto attribute) {
		this.attributes.add(attribute);
	}

	//======== WARNING : both setDropPoint methods are required, they must keep this declaration order ========//
	@SuppressWarnings("unused")
	public void setDropPoint(ObjectNode dropPoint) {
		this.dropPoint = dropPoint;
	}

	/**
	 * Required for conversion with {@link com.remousses.app.modular.component.ModelMapperCustomize}
	 * @param dropPoint
	 */
	@JsonSetter
	@SuppressWarnings("unused")
	public void setDropPoint(JsonNode dropPoint) {
		this.dropPoint = dropPoint;
	}
}
