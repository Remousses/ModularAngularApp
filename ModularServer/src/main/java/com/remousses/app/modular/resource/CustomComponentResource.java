package com.remousses.app.modular.resource;

import com.fasterxml.jackson.databind.JsonNode;
import com.remousses.app.modular.model.dto.CustomComponentDto;
import com.remousses.app.modular.service.CustomComponentService;
import com.remousses.app.modular.service.PageService;
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

//	@PostMapping
//	public CustomComponentDto save(@RequestBody CustomComponentDto customComponentDto) {
//		return this.getService().save(customComponentDto);
//	}

	@PostMapping("{id}")
	public CustomComponentDto save(@PathVariable Integer id, @RequestBody JsonNode dropPoint) {
		return this.getService().savePosition(id, dropPoint);
	}

	@PostMapping("add/{pageId}")
	public CustomComponentDto add(@PathVariable Integer pageId, @RequestBody CustomComponentDto customComponentDto) {
		customComponentDto.setPage(pageService.getById(pageId));
		return this.getService().save(customComponentDto);
	}

	@DeleteMapping("{id}")
	public void deleteById(@PathVariable Integer id) {
		this.getService().deleteById(id);
	}
}
