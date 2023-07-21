package com.remousses.app.modular.resource;

import com.remousses.app.modular.model.entity.Page;
import com.remousses.app.modular.service.PageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/pages/")
public class PageResource {
	@Autowired
	PageService pageService;

	@GetMapping(value = "ping")
	public String ping() {
		return "pong";
	}

	@GetMapping
	public List<Page> getPages() {
		return pageService.getPages();
	}

	@GetMapping("{title}")
	public Page getPageByTitle(@PathVariable String title) {
		return pageService.getPageByTitle(title);
	}
}
