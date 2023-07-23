package com.remousses.app.modular.resource;

import com.remousses.app.modular.model.dto.CustomComponentDto;
import com.remousses.app.modular.service.CustomComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/custom-components/")
public class CustomComponentResource {
	@Autowired
	CustomComponentService customComponentService;

	@PostMapping
	public CustomComponentDto save(@RequestBody CustomComponentDto customComponentDto) {
		return customComponentService.save(customComponentDto);
	}
}
