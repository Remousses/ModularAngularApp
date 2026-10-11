package com.remousses.app.modular.model.dto;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class PageDto {
	private Integer id;
	
	@NotBlank(message = "Page title is required")
	@Size(min = 1, max = 255, message = "Page title must be between 1 and 255 characters")
	private String title;
	
	@NotBlank(message = "Page URL is required")
	@Size(min = 1, max = 255, message = "Page URL must be between 1 and 255 characters")
	@JsonProperty("url")
	private String url;
	
	@JsonManagedReference
	private List<CustomComponentDto> customComponents = new ArrayList<>();

	@SuppressWarnings("unused")
	public void addCustomComponent(CustomComponentDto customComponent) {
		this.customComponents.add(customComponent);
	}
}
