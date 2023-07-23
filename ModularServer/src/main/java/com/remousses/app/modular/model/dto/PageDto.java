package com.remousses.app.modular.model.dto;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PageDto {
	private Integer id;
	private String title;
	private String url;
	@JsonManagedReference
	private List<CustomComponentDto> customComponents;
}
