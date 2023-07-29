package com.remousses.app.modular.resource;

import com.remousses.app.modular.model.dto.PageDto;
import com.remousses.app.modular.service.PageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SuppressWarnings("unused")
@RestController
@RequestMapping("/pages/")
public class PageResource extends AbstractQueryBuilderResource<PageDto, PageService> {

	protected PageResource() {
		super(PageDto.class);
	}

	@GetMapping(value = "ping")
	public String ping() {
		return "pong";
	}

	@GetMapping
	public List<PageDto> getPages() {
		return this.getService().getPages();
	}

	@GetMapping("{title}")
	public PageDto getByTitle(@PathVariable String title) {
		return this.getService().getByTitle(title);
	}

	@PostMapping
	public PageDto save(@RequestBody PageDto pageDto) {
		return this.getService().save(pageDto);
	}

	@DeleteMapping("{title}")
	public void deleteByTitle(@PathVariable String title) {
		this.getService().deleteByTitle(title);
	}
}
