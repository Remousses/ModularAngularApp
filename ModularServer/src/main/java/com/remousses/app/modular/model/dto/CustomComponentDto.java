package com.remousses.app.modular.model.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomComponentDto {
	private String id;
	private String name;
	private DropPointDto dropPoint;
	private List<AttributeDto> attributes;
}
