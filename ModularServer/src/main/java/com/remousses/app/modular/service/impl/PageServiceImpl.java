package com.remousses.app.modular.service.impl;

import com.remousses.app.modular.component.ModelMapperCustomize;
import com.remousses.app.modular.model.dto.PageDto;
import com.remousses.app.modular.repository.PageRepository;
import com.remousses.app.modular.service.PageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PageServiceImpl implements PageService {
    @Autowired
    PageRepository pageRepository;

    @Autowired
    ModelMapperCustomize modelMapperCustomize;

    public List<PageDto> getPages() {
        return modelMapperCustomize.mapList(pageRepository.findAll(), PageDto.class);
    }

    public PageDto getById(Integer id) {
        return modelMapperCustomize.map(pageRepository.findById(id).orElse(null), PageDto.class);
    }

    public PageDto getByTitle(String title) {
        return modelMapperCustomize.map(pageRepository.findByTitle(title), PageDto.class);
    }
}