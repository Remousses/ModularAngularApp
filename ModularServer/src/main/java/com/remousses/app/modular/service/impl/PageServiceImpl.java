package com.remousses.app.modular.service.impl;

import com.remousses.app.modular.component.ModelMapperCustomize;
import com.remousses.app.modular.model.dto.PageDto;
import com.remousses.app.modular.model.entity.Page;
import com.remousses.app.modular.repository.PageRepository;
import com.remousses.app.modular.service.PageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PageServiceImpl implements PageService {
    @Autowired
    PageRepository pageRepository;

    @Autowired
    ModelMapperCustomize modelMapperCustomize;

    @Transactional(readOnly = true)
    public List<PageDto> getPages() {
        return modelMapperCustomize.mapList(pageRepository.findAll(), PageDto.class);
    }

    @Transactional(readOnly = true)
    public PageDto getById(Integer id) {
        return modelMapperCustomize.map(pageRepository.findById(id).orElse(null), PageDto.class);
    }

    @Transactional(readOnly = true)
    public PageDto getByTitle(String title) {
        return modelMapperCustomize.map(pageRepository.findByTitle(title), PageDto.class);
    }

    @Transactional
    public PageDto save(PageDto pageDto) {
        final Page page = modelMapperCustomize.map(pageDto, Page.class);
        return modelMapperCustomize.map(pageRepository.save(page), PageDto.class);
    }

    @Override
    @Transactional
    public void deleteByTitle(String title) {
        pageRepository.deleteByTitle(title);
    }
}