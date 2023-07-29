package com.remousses.app.modular.resource;

import com.fasterxml.jackson.databind.JsonNode;
import com.remousses.app.modular.model.dto.CustomComponentDto;
import com.remousses.app.modular.model.dto.PageDto;
import com.remousses.app.modular.service.CustomComponentService;
import com.remousses.app.modular.service.PageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SuppressWarnings("unused")
@RestController
@RequestMapping("/custom-components/")
public class CustomComponentResource extends AbstractQueryBuilderResource<CustomComponentDto, CustomComponentService>{
	@Autowired
	CustomComponentService customComponentService;

	protected CustomComponentResource() {
		super(CustomComponentDto.class);
	}

	@PostMapping
	public CustomComponentDto save(@RequestBody CustomComponentDto customComponentDto) {
		return customComponentService.save(customComponentDto);
	}

	@PostMapping("{id}")
	public CustomComponentDto save(@PathVariable Integer id, @RequestBody JsonNode dropPoint) {
		return customComponentService.savePosition(id, dropPoint);
	}
}
