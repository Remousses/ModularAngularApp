package com.remousses.app.modular.service;

import com.remousses.app.modular.model.dto.PageDto;

import java.util.List;

public interface PageService {

    List<PageDto> getPages();

    PageDto getById(Integer id);

    PageDto getByTitle(String title);

    PageDto save(PageDto pageDto);

    void deleteByTitle(String title);
}