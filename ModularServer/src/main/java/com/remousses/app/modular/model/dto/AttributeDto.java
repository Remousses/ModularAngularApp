package com.remousses.app.modular.model.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttributeDto {
	private Integer id;
	private String name;
	private String type;
	private String value;
	@JsonBackReference
	private CustomComponentDto customComponent;
}
