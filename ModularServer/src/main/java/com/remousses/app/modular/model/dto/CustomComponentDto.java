package com.remousses.app.modular.model.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.databind.JsonNode;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomComponentDto {
	private Integer id;
	private String name;
	private JsonNode dropPoint;
	private String type;
	@JsonBackReference
	private PageDto page;
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
