package com.remousses.app.modular.model.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomComponentDto {
	private Integer id;
	private String name;
	private JsonNode dropPoint;
	private String type;
	@JsonManagedReference
	private List<AttributeDto> attributes;
	@JsonBackReference
	private PageDto page;
}
