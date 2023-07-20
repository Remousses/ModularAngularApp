package com.remousses.app.modular.service.impl;

import com.remousses.app.modular.model.entity.Page;
import com.remousses.app.modular.repository.PageRepository;
import com.remousses.app.modular.service.PageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PageServiceImpl implements PageService {
	@Autowired
    PageRepository pageRepository;

    public List<Page> getPages() {
        return pageRepository.findAll();

    }
}