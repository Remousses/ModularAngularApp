package com.remousses.app.modular.service.impl;

import com.remousses.app.modular.model.dto.PageDto;
import com.remousses.app.modular.model.entity.Page;
import com.remousses.app.modular.repository.PageRepository;
import com.remousses.app.modular.service.AbstractQueryBuilderService;
import com.remousses.app.modular.service.PageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SuppressWarnings("unused")
@Service
public class PageServiceImpl extends AbstractQueryBuilderService<PageRepository> implements PageService {

    @Transactional(readOnly = true)
    public List<PageDto> getPages() {
        return modelMapperCustomize.mapList(this.getRepository().findAll(), PageDto.class);
    }

    @Transactional(readOnly = true)
    public PageDto getById(Integer id) {
        return modelMapperCustomize.map(this.getRepository().findById(id).orElse(null), PageDto.class);
    }

    @Transactional(readOnly = true)
    public PageDto getByTitle(String title) {
        return modelMapperCustomize.map(this.getRepository().findByTitle(title), PageDto.class);
    }

    @Transactional
    public PageDto save(PageDto pageDto) {
        final Page page = modelMapperCustomize.map(pageDto, Page.class);
        return modelMapperCustomize.map(this.getRepository().save(page), PageDto.class);
    }

    @Override
    @Transactional
    public void deleteByTitle(String title) {
        this.getRepository().deleteByTitle(title);
    }
}