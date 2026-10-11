package com.remousses.app.modular.resource;

import com.fasterxml.jackson.databind.JsonNode;
import com.remousses.app.modular.model.dto.CustomComponentDto;
import com.remousses.app.modular.model.dto.ComponentSizeDto;
import com.remousses.app.modular.service.CustomComponentService;
import com.remousses.app.modular.service.PageService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
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
	PageService pageService;

	protected CustomComponentResource() {
		super(CustomComponentDto.class);
	}

	@PostMapping("{id}")
	public CustomComponentDto save(@PathVariable @NotNull(message = "Component ID cannot be null") Integer id, 
	                                @RequestBody JsonNode dropPoint) {
		return this.getService().savePosition(id, dropPoint);
	}

	@PostMapping("{id}/size")
	public CustomComponentDto saveSize(@PathVariable @NotNull(message = "Component ID cannot be null") Integer id,
	                                  @Valid @RequestBody ComponentSizeDto size) {
		return this.getService().saveSize(id, size);
	}

	@PostMapping("add/{pageId}")
	public CustomComponentDto add(@PathVariable @NotNull(message = "Page ID cannot be null") Integer pageId, 
	                               @Valid @RequestBody CustomComponentDto customComponentDto) {
		customComponentDto.setPage(pageService.getById(pageId));
		return this.getService().save(customComponentDto);
	}

	@DeleteMapping("{id}")
	public void deleteById(@PathVariable @NotNull(message = "Component ID cannot be null") Integer id) {
		this.getService().deleteById(id);
	}
}
