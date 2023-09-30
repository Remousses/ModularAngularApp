package com.remousses.app.modular.resource;

import com.remousses.app.modular.model.dto.AttributeDto;
import com.remousses.app.modular.service.AttributeService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SuppressWarnings("unused")
@RestController
@RequestMapping("/attributes/")
public class AttributeResource extends AbstractQueryBuilderResource<AttributeDto, AttributeService>{

	protected AttributeResource() {
		super(AttributeDto.class);
	}

	@PostMapping
	public AttributeDto save(@RequestBody AttributeDto attributeDto) {
		return this.getService().save(attributeDto);
	}

	@DeleteMapping("{id}")
	public void deleteById(@PathVariable Integer id) {
		this.getService().deleteById(id);
	}
}
