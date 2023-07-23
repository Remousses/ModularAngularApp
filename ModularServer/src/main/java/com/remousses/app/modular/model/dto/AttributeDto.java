package com.remousses.app.modular.model.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttributeDto {
	private Integer id;
	private String name;
	private String value;
	private String type;
	@JsonBackReference
	private CustomComponentDto customComponent;
}
